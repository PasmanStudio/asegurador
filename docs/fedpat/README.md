# API Federación Patronal Seguros — Referencia de integración

> Documento de consulta para integrar el cotizador online con la API REST de
> Federación Patronal (FedPat). Construido a partir de la documentación pública
> y los OpenAPI reales del ambiente **sandbox** (junio 2026, API v1.6.5).
>
> Los specs OpenAPI completos están en [`./openapi/`](./openapi) — son la fuente
> de verdad; este README es la versión navegable y curada.

---

## 1. Estado y resumen

- **La API existe, está documentada y es gratuita para productores habilitados.**
  No es auto-servicio: requiere ser PAS con acuerdo con FedPat y que te entreguen
  credenciales por un canal seguro.
- Es una API REST estándar: **OAuth2 para el token + Bearer JWT** en cada request.
- Cubre el ciclo completo: **cotizar → recotizar/descuentos → emitir póliza →
  imprimir póliza/certificado**, además de catálogos (productos, planes, vehículos)
  y gestión de clientes/cartera.
- ⚠️ **Dependencia crítica:** la API **no** resuelve marca/modelo a código. Espera
  un **código Infoauto** ya resuelto (ver [§6](#6-dependencia-infoauto)).

## 2. Ambientes

| Ambiente | URL base | Uso |
|----------|----------|-----|
| **Sandbox** | `https://api-sandbox.fedpat.com.ar/v1` | Pruebas durante el desarrollo. |
| **Producción** | `https://api.fedpat.com.ar/v1` | Real. Requiere **auditoría** previa de FedPat (verifican que las credenciales no queden expuestas en el frontend). |

> El token se pide al host raíz (`/oauth/token`), los servicios cuelgan de `/v1`.

## 3. Autenticación

**OAuth2** — `grant_type: password` con **Basic Auth de cliente**. Ojo: hay **dos**
juegos de credenciales.

- **Endpoint:** `POST https://[ambiente].fedpat.com.ar/oauth/token`
  (`[ambiente]` = `api` | `api-sandbox`)
- **Authorization:** `Basic base64(CLIENT_ID:CLIENT_SECRET)`
- **Content-Type:** `application/x-www-form-urlencoded`
- **Body:**
  | Campo | Valor |
  |-------|-------|
  | `grant_type` | `password` |
  | `username` | usuario provisto por FedPat |
  | `password` | contraseña provista por FedPat |

**Ejemplo:**
```bash
curl -X POST "https://api-sandbox.fedpat.com.ar/oauth/token" \
  -u "$FEDPAT_CLIENT_ID:$FEDPAT_CLIENT_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "username=$FEDPAT_USERNAME" \
  -d "password=$FEDPAT_PASSWORD"
```

**Respuesta OK:**
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "expires_in": 3599,
  "scope": "read write",
  "jti": "a1b2c3d4-..."
}
```

**Respuesta de error:** `{ "error": "...", "error_description": "..." }`
(`invalid_client`, `invalid_grant`, `invalid_scope`, `unsupported_grant_type`, …)

Después, **cada** request a un recurso protegido lleva:
```
Authorization: Bearer <access_token>
```

> 🔒 **Obligatorio server-side.** FedPat audita que el `CLIENT_SECRET` y la
> obtención del token nunca ocurran en el navegador. En nuestro código ya está
> bien: el token se pide desde el route handler (`lib/insurers/fedpat.ts`), nunca
> desde el cliente. **No** exponer credenciales en `NEXT_PUBLIC_*`.

## 4. Flujo de una operación de automotor

```
1. (pre) Resolver código Infoauto del vehículo            → §6 (externo a FedPat)
2. POST /cotizador-automotores                            → crea cotización, devuelve nº
3. (opcional) POST /cotizador-automotores/{nro}/descuentos→ recotiza con beneficios
   (opcional) PUT  /cotizador-automotores/{nro}/fecha-desde
4. GET  /cotizador-automotores/{nro}                      → relee la cotización
5. POST /emision-automotores/{cotizacion}                 → emite la póliza
6. GET  /poliza/.../reporte/poliza | certificado-cobertura→ PDF de póliza/certificado
```

Para **mostrar precios en la web** sólo necesitamos los pasos 1–2 (y 3 si querés
aplicar descuentos). La emisión (5–6) es una segunda fase.

## 5. Endpoint principal — `POST /cotizador-automotores`

Crea una cotización de automotor y devuelve su número (`201 Created`).

### Request body (campos)

> `*` = obligatorio. Tipos y enums tomados del OpenAPI `cotizacion.json`.

**Nivel raíz**
| Campo | Tipo | Notas |
|-------|------|-------|
| `fecha_desde` * | string | Vigencia de la cotización, `dd/MM/yyyy`. |
| `medio_pago` * | int `1\|2` | 1 = Efectivo, 2 = Débito automático (tarjeta). |
| `razon_social` * | int | Código de tipo de personería del contratante. |
| `numero_cotizacion` | int64 | Sólo al recotizar/actualizar. |
| `descuento_comision` | int | Descuento sobre la comisión del productor. |
| `pago_contado` | bool | Pago único por débito automático. |
| `cliente_nuevo` | bool | Beneficio de descuento (sujeto a condición). |
| `refacturaciones` | int `2\|12` | Cantidad de refacturaciones. |

**`contratante` ** (objeto)
| Campo | Tipo | Notas |
|-------|------|-------|
| `condicion_iva` * | enum `IN\|CF\|EA\|IR\|ED\|MO\|NC\|...` | Inscripto, Consumidor Final, Exento, etc. |
| `id` | int | Nº de documento (DNI o Pasaporte). |
| `tipo_id` | enum `DNI\|PA` | Tipo de documento. |
| `cuit` | string | Si no es consumidor final. |
| `nombre` / `apellido` | string | Persona física. |
| `razon_social` | string | Si es persona jurídica. |
| `localidad` | int | Código de localidad. |
| `matricula` | string | ID de cliente ya existente en FedPat. |
| `nacionalidad` | string | |

**`vehiculo` ** (objeto)
| Campo | Tipo | Notas |
|-------|------|-------|
| `infoauto` * | string | **Código Infoauto** (marca+modelo). Ver §6. |
| `anio` * | string | Año modelo. |
| `tipo_vehiculo` * | int | Código de tipo de vehículo (catálogo, ver §7). |
| `localidad_de_guarda` * | int | Código de localidad de guarda. |
| `alarma` | bool | |
| `rastreador` | int | Código de rastreador satelital. |
| `gnc` | bool | |
| `volcador` | bool | |
| `suma_asegurada` | double | Suma para coberturas de casco. |

**`coberturas`** (objeto, opcional — define qué se calcula)
Campos destacados: `plan` (enum `A4\|B\|B1\|C\|C1\|CF\|E\|E1\|...`; `null` = cotiza
todos los planes), `franquicia` (int), `ajuste_automatico` (% enum `10..80`),
`rc_ampliada` (`50\|99\|100\|150`), `rc_conosur` (`1\|2\|3\|99`), `casco_conosur`,
`grua`, `taller_exclusivo`, `interasegurado`, etc. (ver spec para la lista completa).

**Otros bloques opcionales:** `producto_modular` (módulos + `fecha_nacimiento`),
`asegura2[]` (multirrámicos ramo/producto), `accesorio[]` (código + suma asegurada).

### Ejemplo de request (mínimo viable)
```json
{
  "fecha_desde": "10/06/2026",
  "medio_pago": 2,
  "razon_social": 1,
  "contratante": {
    "tipo_id": "DNI",
    "id": 30111222,
    "condicion_iva": "CF",
    "nombre": "Juan",
    "apellido": "Pérez",
    "localidad": 1407
  },
  "vehiculo": {
    "infoauto": "123456",
    "anio": "2021",
    "tipo_vehiculo": 1,
    "localidad_de_guarda": 1407,
    "gnc": false,
    "alarma": true
  },
  "coberturas": { "plan": null }
}
```

### Respuesta — `201 Created` (media type `*/*`)

Devuelve el eco de los datos enviados + el **número de cotización** + **el array
de planes con sus precios**. Lo que nos importa para mostrar en la web está en
`coberturas.planes[]`:

| Campo (por plan) | Tipo | Qué es |
|------------------|------|--------|
| `codigo` | string | Código del plan de cobertura (RC, C, TR…). |
| `descripcion` | string | Nombre del plan. |
| `premio_automotor` | double | **Premio calculado** de la cotización (lo que paga el cliente). |
| `premio_total` | double | Premio total. |
| `prima_tarifa` | double | Prima de tarifa (sin impuestos/recargos). |
| `monto_cuota_total` | double | **Valor de la cuota** (financiado). |
| `monto_pago_contado` | double | Valor si paga de contado. |
| `in_exclusion` | string | Marca de exclusión, si aplica. |

A nivel raíz vuelven además: `numero_cotizacion` (int64), `fecha_desde` /
`fecha_hasta` (vigencia), y el eco de `vehiculo` / `contratante` / `coberturas`.

**Ejemplo de respuesta (resumida):**
```json
{
  "numero_cotizacion": 129445013,
  "fecha_desde": "2026-06-10",
  "fecha_hasta": "2026-07-10",
  "vehiculo": { "infoauto": "170641", "anio": "2018", "tipo_vehiculo": 46 },
  "coberturas": {
    "planes": [
      {
        "codigo": "C",
        "descripcion": "Terceros Completo",
        "premio_automotor": 32544.5,
        "premio_total": 34890.0,
        "monto_cuota_total": 5815.0,
        "monto_pago_contado": 33145.5
      }
    ]
  }
}
```

> Cada elemento de `planes[]` = una opción de cobertura cotizada con su precio.
> Para mostrar "desde $X/mes" usamos el `monto_cuota_total` (o `premio_automotor`)
> del plan más conveniente.
>
> 📌 Los **valores exactos** y la lista de planes hay que confirmarlos con una
> llamada real al sandbox, pero la **estructura ya está cerrada** (arriba).

### Errores (todos `application/json`)

Mismo formato para `400 / 401 / 403 / 409 / 500`:
```json
{ "mensaje": "Datos de entrada inválidos", "codigo_error": "...", "time": "..." }
```
`400` datos inválidos · `401` token inválido · `403` sin permisos ·
`409` conflicto · `500` error inesperado.

## 6. Dependencia Infoauto

El campo `vehiculo.infoauto` es un **código de la base Infoauto** (la tabla
estándar de valuación de autos en Argentina). La API de FedPat **no** ofrece
búsqueda marca/modelo → código: lo da por resuelto. Opciones:

1. Que FedPat indique cómo obtener/sincronizar esos códigos para productores.
2. Licenciar/consumir la base **Infoauto** por separado.
3. Pedir al usuario datos suficientes y resolver el código en backend con una
   tabla propia.

Una vez resuelto el código, los endpoints de [`vehiculos.json`](./openapi/vehiculos.json)
dan datos derivados: `tipos` (→ `tipo_vehiculo`), `franquicia-vigente`, `grua`,
`alarma-fabrica`, `accesorios`.

## 7. Catálogos (códigos paramétricos)

Los enums/códigos (tipo_vehiculo, localidad, planes, condicion_iva…) se obtienen
de [`productos.json`](./openapi/productos.json):

| Endpoint | Para qué |
|----------|----------|
| `GET /productos/habilitados/cotizar` | Ramos y productos que podés cotizar. |
| `GET /productos/{ramo}/{producto}/planes` | Planes de cobertura disponibles. |
| `GET /productos/{ramo}/{producto}/coberturas` | Bienes y coberturas. |
| `GET /productos/{ramo}/{producto}/{bien}/datos-cotizacion` | Datos paramétricos requeridos. |
| `GET /productos/opciones/{codigo-dato}` | Opciones de un dato paramétrico (catálogos). |

> Automotores = **ramo 4**; Motovehículos = **ramo 44**.

## 8. Otros servicios disponibles

| Servicio | Spec | Endpoints clave |
|----------|------|-----------------|
| **Cotización** | [`cotizacion.json`](./openapi/cotizacion.json) | `POST /cotizador-automotores`, `.../descuentos`, `.../fecha-desde`, `cotizador-otros-ramos` |
| **Emisión** | [`emision.json`](./openapi/emision.json) | `POST /emision-automotores/{cotizacion}`, `POST /emision-otros-ramos/{cotizacion}`, reportes de póliza |
| **Vehículos** | [`vehiculos.json`](./openapi/vehiculos.json) | datos por `codInfoAuto` (tipos, franquicias, grúa, accesorios) |
| **Productos** | [`productos.json`](./openapi/productos.json) | catálogos de ramos/productos/planes/coberturas |
| **Clientes** | [`clientes.json`](./openapi/clientes.json) / [`clientes-matriculacion.json`](./openapi/clientes-matriculacion.json) | alta de cliente, vinculación de medio de pago |
| **Cartera** | [`cartera.json`](./openapi/cartera.json) | gestión de cartera del productor |
| **Inspección** | [`inspeccion.json`](./openapi/inspeccion.json) | inspecciones previas |
| **Póliza** | [`poliza.json`](./openapi/poliza.json) | consulta/impresión de pólizas |

## 9. Mapeo a nuestro código

El adaptador actual [`lib/insurers/fedpat.ts`](../../lib/insurers/fedpat.ts) es un
esqueleto con supuestos que **hay que corregir** según el contrato real:

| Hoy (placeholder) | Real (según esta doc) |
|-------------------|------------------------|
| `grant_type=client_credentials` | **`grant_type=password`** + Basic Auth `client_id:client_secret` + `username`/`password` |
| `POST {BASE}/oauth/token` con `client_id`/`secret` en el body | Credenciales de cliente en header **Basic**, usuario/clave en el body |
| `POST {BASE}/automotor/cotizacion` (inventado) | **`POST {BASE}/v1/cotizador-automotores`** |
| Body `{ vehiculo:{marca,modelo,anio}, codigoPostal }` | Body real de §5 (`infoauto`, `tipo_vehiculo`, `localidad_de_guarda`, `contratante`, …) |
| Schema `quoteInputAutoSchema` (marca/modelo/anio/CP) | Ampliar a los campos reales + resolución Infoauto |

**Variables de entorno** (actualizar `.env.example`):
```
FEDPAT_API_BASE=https://api-sandbox.fedpat.com.ar
FEDPAT_CLIENT_ID=...        # Basic Auth (header)
FEDPAT_CLIENT_SECRET=...    # Basic Auth (header)
FEDPAT_USERNAME=...         # grant_type=password (body)
FEDPAT_PASSWORD=...         # grant_type=password (body)
FEDPAT_PRODUCER_CODE=...    # código de productor, si aplica en emisión
```

## 10. Qué pedirle a Federación Patronal

Para activar la integración necesitamos que FedPat (vía el contacto comercial/
técnico del productor) entregue:

1. **Credenciales sandbox**: `CLIENT_ID`, `CLIENT_SECRET`, `username`, `password`.
2. **Confirmación del flujo Infoauto**: cómo obtenemos/usamos los códigos (§6).
3. **Códigos paramétricos** de arranque o acceso a los catálogos de §7
   (tipo_vehiculo, localidades, planes habilitados para el productor).
4. **Ejemplo de respuesta de cotización** (o vía sandbox) para mapear primas.
5. Datos del productor: matrícula SSN (✔ Sabrina la tiene, N° 89115) y CUIT.
6. Luego: credenciales productivas + pasar la **auditoría** de seguridad (§2).

**Contacto API:** soporte@fedpat.com.ar ·
[fedpat.com.ar/support](https://www.fedpat.com.ar/support) ·
[alta de productores](https://www.fedpat.com.ar/productores/alta-pas-estudio-broker/)

## 11. Checklist de activación

- [ ] Conseguir credenciales sandbox de FedPat.
- [ ] Cargar `.env.local` con las 4–5 variables (§9).
- [ ] Probar `oauth/token` (script de conectividad) y guardar token.
- [ ] Resolver estrategia Infoauto (§6).
- [ ] Llamada real `POST /cotizador-automotores` y **documentar la respuesta** (§5).
- [ ] Corregir `lib/insurers/fedpat.ts` (auth + endpoint + mapeo).
- [ ] Ampliar `quoteInputAutoSchema` y el wizard para enviar los campos reales.
- [ ] Construir la UI de resultados (primas) y conectar el wizard a `/api/cotizar`.
- [ ] Auditoría de seguridad FedPat → credenciales productivas.

## 12. Fuentes

- Portal de la API: <https://api-sandbox.fedpat.com.ar/>
- Documentación de autenticación: <https://api-sandbox.fedpat.com.ar/documentacion-autenticacion.html>
- Servicios / docs (ReDoc): `documentacion-cotizador.html`, `-emision.html`,
  `-vehiculos.html`, `-productos.html`, `-clientes.html`, `-cartera.html`,
  `-inspeccion.html`, `-poliza.html`, `-matriculacion.html`
- Specs OpenAPI crudos: [`./openapi/`](./openapi) (sandbox v1.6.5, descargados 2026-06)

> ⚠️ Esta doc refleja el **sandbox** a junio 2026. Verificá contra la doc oficial
> al integrar; los códigos paramétricos y el cuerpo de respuesta deben confirmarse
> contra una llamada real.

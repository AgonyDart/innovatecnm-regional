from fastapi import APIRouter, Request
from typing import Any, Dict
from . import panels

router = APIRouter(
    prefix="/alexa",
    tags=["alexa"],
)


def _alexa_response(text: str, should_end_session: bool = True) -> Dict[str, Any]:
    return {
        "version": "1.0",
        "response": {
            "outputSpeech": {"type": "PlainText", "text": text},
            "shouldEndSession": should_end_session,
        },
    }


@router.post("/skill")
async def alexa_skill_endpoint(req: Request):
    payload = await req.json()

    req_body = payload.get("request", {})
    req_type = req_body.get("type")

    if req_type != "IntentRequest":
        return _alexa_response("Hola, dime qué deseas consultar sobre tu panel.")
    intent = req_body.get("intent", {})
    intent_name = intent.get("name")
    try:
        if intent_name == "get_savings_mxn":
            data = panels.read_savings()
            amount = data.get("savings_mxn_monthly")
            text = f"El ahorro mensual estimado es de {amount} pesos mexicanos." if amount is not None else "No hay datos de ahorro disponibles."
            return _alexa_response(text)
        if intent_name == "get_energy_generated_kwh":
            data = panels.read_savings()
            energy_monthly = data.get("energy_generated_kwh_monthly")
            energy_daily = data.get("energy_generated_kwh_daily")
            text = f"Tu panel ha generado {energy_monthly} kilovatios-hora este mes. Y {energy_daily} kilovatios-hora hoy." if energy_monthly and energy_daily is not None else "No hay datos de energía generada disponibles."
            return _alexa_response(text)
        if intent_name == "get_power_w":
            data = panels.read_savings()
            energy_generated = data.get("energy_generated_w")
            text = f"Tu panel ha generado un total de {energy_generated} vatios." if energy_generated is not None else "No hay datos de potencia disponibles."
            return _alexa_response(text)
        if intent_name == "get_panels":
            all_panels = panels.read_panels()
            if not all_panels:
                return _alexa_response("No tienes paneles registrados.")
            names = [p.get("name") or f"panel {p.get('panel_id', i)}" for i, p in enumerate(all_panels)]
            text = f"Tienes {len(all_panels)} paneles: " + ", ".join(names)
            return _alexa_response(text)
        return _alexa_response("No entendí esa acción. Puedes pedir la potencia, el ahorro o la última lectura.")

    except Exception as e:
        return _alexa_response(f"Ocurrió un error al procesar la petición: {str(e)}")

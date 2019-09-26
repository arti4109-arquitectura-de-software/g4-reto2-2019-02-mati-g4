using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenger2.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Challenger2.Controllers
{
    public class Invoice
    {
        public string TerminalCode { get; set; }
        public string Date { get; set; }

        public string description { get; set; }

        public string NroInvoice { get; set; }

        public string SaleCode { get; set; }
        public string Value { get; set; }

        public ValidType response { get; set; }
    }

    public enum ValidType
    {
        IpNoValid,
        HashingNoFound,
        RowNotValid,
        NoNumberFacture,
        ProductValueFiled,
        FailAutentication,
        NumberNoFoundPos,
        FailedPos
    }


    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private IHubContext<ValidateHub, ITypedHubClient> _hubContext;

        public InvoiceController(IHubContext<ValidateHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public bool InvoiceProcess(Invoice invoice)
        {

            string message = string.Empty;

            switch(invoice.response)
            {
                case ValidType.FailAutentication:
                    message = "falla en autenticación";
                    break;
                case ValidType.FailedPos:
                    message = "El pos a enviado mas de 10 veces datos de facturación enviada";
                    break;
                case ValidType.HashingNoFound:
                    message = "No es psoible autenticar el POS";
                    break;
                case ValidType.IpNoValid:
                    message = "La dirección ip no corresponde a los POS";
                    break;
                case ValidType.NoNumberFacture:
                    message = "No existe ese numero de factura";
                    break;
                case ValidType.NumberNoFoundPos:
                    message = "Ese numero de factuación no se ha asignado al pos";
                    break;
                case ValidType.ProductValueFiled:
                    message = "Costo del producto no valido";
                    break;
                case ValidType.RowNotValid:
                    message = "Campos no validos";
                    break;
            }

            _hubContext.Clients.All.BroadcastMessage("error", "validación fallida");

            return true;
        }
    }
}
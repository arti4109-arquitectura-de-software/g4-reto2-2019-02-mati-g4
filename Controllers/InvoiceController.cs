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

            _hubContext.Clients.All.BroadcastMessage("error", "validación fallida");

            return true;
        }
    }
}
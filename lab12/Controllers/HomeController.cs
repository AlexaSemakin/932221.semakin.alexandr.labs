using Microsoft.AspNetCore.Mvc;

namespace lab12.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Privacy() => View();
        public IActionResult Error() => View();
    }
}

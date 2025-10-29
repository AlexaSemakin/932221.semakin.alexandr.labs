using Microsoft.AspNetCore.Mvc;
using lab12.Models;
using lab12.Services;

namespace lab12.Controllers
{
    public class CalcController : Controller
    {
        private readonly ICalcService _calc;

        public CalcController(ICalcService calc)
        {
            _calc = calc;
        }

        private (double result, string? error, string op) DoCalc(double first, string? operation, double second)
        {
            var op = (operation ?? "+").Trim();
            if (op.Length > 0) op = op[0].ToString();
            try
            {
                return op switch
                {
                    "+" => (_calc.Add(first, second), null, op),
                    "-" => (_calc.Sub(first, second), null, op),
                    "*" => (_calc.Mul(first, second), null, op),
                    "/" => (_calc.Div(first, second), null, op),
                    _ => (0, "Неизвестная операция", op)
                };
            }
            catch (DivideByZeroException)
            {
                return (0, "Ошибка: деление на ноль!", op);
            }
        }

        [HttpGet]
        public IActionResult Manual() => View();

        [HttpPost]
        public IActionResult Manual(double first, string operation, double second)
        {
            var (res, err, op) = DoCalc(first, operation, second);
            ViewBag.First = first;
            ViewBag.Second = second;
            ViewBag.Operation = op;
            ViewBag.Result = res;
            ViewBag.Error = err;
            return View("Result");
        }

        [HttpGet]
        public IActionResult ManualWithSeparateHandlers() => View();

        [HttpPost]
        public IActionResult ManualWithSeparateHandlers(double first, string? operation, double second)
        {
            var (res, err, op) = DoCalc(first, operation, second);
            ViewBag.First = first;
            ViewBag.Second = second;
            ViewBag.Operation = op;
            ViewBag.Result = res;
            ViewBag.Error = err;
            return View("Result");
        }

        [HttpGet]
        public IActionResult ModelBindingInParameters() => View();

        [HttpPost]
        public IActionResult ModelBindingInParameters(double first, string operation, double second)
        {
            var (res, err, _) = DoCalc(first, operation, second);
            ViewData["Result"] = err ?? res.ToString();
            ViewData["Error"] = err;
            return View("Result");
        }

        [HttpGet]
        public IActionResult ModelBindingInSeparateModel() => View(new CalcModel());

        [HttpPost]
        public IActionResult ModelBindingInSeparateModel(CalcModel model)
        {
            var (res, err, _) = DoCalc(model.First, model.Operation, model.Second);
            ViewData["Result"] = err ?? res.ToString();
            ViewData["Error"] = err;
            return View("Result");
        }
    }
}

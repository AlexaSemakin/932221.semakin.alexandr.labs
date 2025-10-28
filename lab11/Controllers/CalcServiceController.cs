using Lab11.Models;
using Lab11.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lab11.Controllers;

public class CalcServiceController(ICalcService calc) : Controller
{
    private readonly ICalcService _calc = calc;
    private static readonly Random _rnd = new();

    public IActionResult Index() => View();

    public IActionResult PassUsingModel()
    {
        int a = _rnd.Next(0, 11);
        int b = _rnd.Next(0, 11);

        var vm = new CalcViewModel
        {
            A = a,
            B = b,
            Add = _calc.Add(a, b),
            Sub = _calc.Sub(a, b),
            Mult = _calc.Mult(a, b),
            Div = _calc.Div(a, b)
        };

        return View(vm);
    }

    public IActionResult PassUsingViewData()
    {
        int a = _rnd.Next(0, 11);
        int b = _rnd.Next(0, 11);

        ViewData["A"] = a;
        ViewData["B"] = b;
        ViewData["Add"]  = _calc.Add(a, b);
        ViewData["Sub"]  = _calc.Sub(a, b);
        ViewData["Mult"] = _calc.Mult(a, b);
        ViewData["Div"]  = _calc.Div(a, b);

        return View();
    }

    public IActionResult PassUsingViewBag()
    {
        int a = _rnd.Next(0, 11);
        int b = _rnd.Next(0, 11);

        ViewBag.A = a;
        ViewBag.B = b;
        ViewBag.Add  = _calc.Add(a, b);
        ViewBag.Sub  = _calc.Sub(a, b);
        ViewBag.Mult = _calc.Mult(a, b);
        ViewBag.Div  = _calc.Div(a, b);

        return View();
    }

    public IActionResult AccessServiceDirectly()
    {
        int a = _rnd.Next(0, 11);
        int b = _rnd.Next(0, 11);

        ViewBag.A = a;
        ViewBag.B = b;
        return View();
    }
}

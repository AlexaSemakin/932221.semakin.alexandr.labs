using System.ComponentModel.DataAnnotations;

namespace lab12.Models;

public class CalcInput
{
    [Display(Name = "Первое число")]
    public double A { get; set; }

    [Display(Name = "Операция")]
    public char Op { get; set; } = '+';

    [Display(Name = "Второе число")]
    public double B { get; set; }
}

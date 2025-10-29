using System.ComponentModel.DataAnnotations;

namespace lab12.Models
{
    public class CalcModel
    {
        [Display(Name = "Первое число")]
        public double First { get; set; }

        [Display(Name = "Операция")]
        public string Operation { get; set; } = "+";

        [Display(Name = "Второе число")]
        public double Second { get; set; }
    }
}

namespace Lab11.Services;

public class CalcService : ICalcService
{
    public int Add(int a, int b) => a + b;
    public int Sub(int a, int b) => a - b;
    public int Mult(int a, int b) => a * b;
    public string Div(int a, int b)
        => b == 0 ? "error: division by zero" : (a / b).ToString();
}

using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Reactive.Threading.Tasks;
using System.Runtime.InteropServices;

// 1. Normales Enumerable
goto start;
Enumerable.Range(1, 10).ToList().ForEach(Console.WriteLine);

// 2. Async Enumerable

await foreach (var item in RangeAsync(11,10,50))
{
    Console.WriteLine(item);
}

async IAsyncEnumerable<int> RangeAsync(int from, int num, int ms)
{
    for (var i = from; i < from + num; i++)
    {
        await Task.Delay(ms);
        yield return i;
    }
}

// 3. Observable mit zeitl. Ablauf

var disposable1 = Observable
    .Interval(TimeSpan.FromMilliseconds(100))
    .Subscribe(Console.WriteLine);

await Task.Delay(500);
disposable1.Dispose();

Observable
    .Generate<int,int>(50, i=>i<60, i=>i+1, i=>i, CreateTimespan)
    .Subscribe(Console.WriteLine, e => Console.WriteLine($"Problem: {e}"), ()=>Console.WriteLine("Generate completed"));

TimeSpan CreateTimespan(int i) => TimeSpan.FromMilliseconds(i);

// 4. IObservable vs IObserver

IObservable<string> observable = Observable.Return<string>("Hello Rx");
IObserver<string> observer = new StringObserver();
observable.Subscribe(observer);

var subject = new Subject<string>();
subject.Subscribe(new StringObserver());
subject.OnNext("Subject! Hello");
subject.OnNext("Subject! World");
subject.OnError(new Exception("Oops"));
subject.OnCompleted();
Console.ReadLine();


// 5. Interop .Net <=> Rx

// Enumerable <=> Observable
Enumerable.Range(100, 10).ToObservable().Subscribe(Console.WriteLine, ()=>Console.WriteLine("Enumerable completed"));

// From Event
var ec = new EventClass();
Observable
    .FromEventPattern<EventHandler<string>, string>(
        h => ec.EventOccured += h, 
        h => ec.EventOccured -= h)
    .Subscribe(p=>Console.WriteLine($"Event fired by {p.Sender}: {p.EventArgs}"));
ec.Fire("hello");
ec.Fire("world");
ec.Fire("that's");
ec.Fire("rx");

// From Task
CreateString("Task to observable")
    .ToObservable()
    .Subscribe(new StringObserver());

// ToTask
int thevalue = await (Observable.Generate(1, i=>i<5, i=>i+1, i=>i, i=>TimeSpan.FromMilliseconds(100))).ToTask();
Console.WriteLine(thevalue);

// FromAsyncPattern ...

// ToEnumerable
var ints = Observable
    .Generate<int, int>(200, i => i < 220, i => i + 1, i => i, i => TimeSpan.FromMilliseconds(1000))
    .ToEnumerable();

foreach (var i in ints)
{
    Console.WriteLine(i);
}

// 6. Filtern

disposable1 = Observable
    .Interval(TimeSpan.FromSeconds(1))
    .Select(_ => DateTime.Now.ToString("HH:mm:ss,fff"))
    .DistinctUntilChanged()
    .Where(s => s.Contains("8"))
    .Subscribe(t => Console.WriteLine(t));
await Task.Delay(1000);
disposable1.Dispose();

Observable
    .Generate(101, i => i < 1000, i => i + 1, i => i, i => TimeSpan.FromMilliseconds(1))
    .Do(Console.WriteLine)
    .Buffer(50)
    .Subscribe(list => Console.WriteLine($"New Buffer with numbers from {list.Min()} to {list.Max()}"));

await Task.Delay(12000);
Console.ReadLine();

// 7. Compositions

start:
Observable
    .Generate(65, i => i < 90, i => i + 1, i => (char)i, i => TimeSpan.FromMilliseconds(100))
    .CombineLatest(Observable.Generate(1, i => i < 200, i => i + 1, i => i, i => TimeSpan.FromMilliseconds(10)))
    .Subscribe(v => Console.WriteLine($"{v.First}-{v.Second}"));

await Task.Delay(12000);
var rnd = new Random(Guid.NewGuid().GetHashCode());
var even = Observable.Generate(
    2, 
    i => i < 100, 
    i => i + 2, 
    i => i, 
    i => TimeSpan.FromMilliseconds(rnd.Next(50, 500)));

var odd = Observable.Generate(
    1,
    i => i < 100,
    i => i + 2,
    i => i,
    i => TimeSpan.FromMilliseconds(rnd.Next(50, 500)));

even.Merge(odd).Subscribe(n=>Console.WriteLine($"Even or odd? {n}"));

async Task<string> CreateString(string value)
{
    await Task.Delay(1000);
    return value; 
}

await Task.Delay(-1);

class StringObserver : IObserver<string>
{
    public void OnCompleted() => Console.WriteLine("Completed");

    public void OnError(Exception error) => Console.WriteLine(error);

    public void OnNext(string value) => Console.WriteLine($"Next {value}");
}

class EventClass
{
    public event EventHandler<string>? EventOccured;
    internal void Fire(string message) => EventOccured?.Invoke(this, message);
}

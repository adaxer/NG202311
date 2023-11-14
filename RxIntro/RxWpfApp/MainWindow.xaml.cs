using System;
using System.Collections.ObjectModel;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Threading;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Input.Manipulations;

namespace RxWpfApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private App app;

        public MainWindow()
        {
            app = (Application.Current as App)!;
            app.Log.OnNext("Window initializing");
            InitializeComponent();
            app.Hub.Subscribe(Show);
            app.Log.OnNext("Window initialized");

            var textchanges = Observable
                .FromEventPattern<TextChangedEventHandler, TextChangedEventArgs>(
                    h => Search.TextChanged += h,
                    h => Search.TextChanged -= h)
                .Select(x => ((TextBox)x.Sender!).Text);

            textchanges
                .Throttle(TimeSpan.FromMilliseconds(700))
                .ObserveOn(SynchronizationContext.Current!)
                .Subscribe(app.Log);

            // Ok, but beware: https://github.com/dotnet/reactive/issues/395 solved??

            var mouseDown = Observable.FromEventPattern<MouseButtonEventArgs>(this.Ball, "MouseLeftButtonDown");
            var mouseMove = Observable.FromEventPattern<MouseEventArgs>(this.Field, "MouseMove");
            var mouseUp = Observable.FromEventPattern<MouseButtonEventArgs>(this.Field, "PreviewMouseLeftButtonUp");

            mouseDown.Subscribe(_ => app.Log.OnNext("Mousedown"));
            mouseMove
                .Sample(TimeSpan.FromSeconds(1))
                .DistinctUntilChanged()
                .ObserveOn(SynchronizationContext.Current!)
                .Subscribe(e => app.Log.OnNext($"Mousemove: {e.EventArgs.GetPosition(Field)}"));
            mouseUp.Subscribe(_ => app.Log.OnNext("Mouseup"));

            Point start;
            var drag = mouseDown
                .Select(args => args.EventArgs.GetPosition(Field))
                .Do(p => start = new Point(Canvas.GetLeft(Ball), Canvas.GetTop(Ball)))
                .CombineLatest(mouseMove
                    .Select(args => args.EventArgs.GetPosition(Field)),
                    (p1, p2) => new { p1, p2 })
                .Do(p => MoveBall(start + (p.p2 - p.p1)))
                .TakeUntil(mouseUp)
                .Repeat();

            drag
                .Sample(TimeSpan.FromMilliseconds(200))
                .ObserveOn(SynchronizationContext.Current!)
                .Subscribe(p => app.Log.OnNext($"Dragging: {p.p1}, {p.p2}"));
        }

        private void MoveBall(Point position)
        {
            Canvas.SetLeft(Ball, position.X);
            Canvas.SetTop(Ball, position.Y);
        }

        public ObservableCollection<string> Messages
        {
            get { return (ObservableCollection<string>)GetValue(MessagesProperty); }
            set { SetValue(MessagesProperty, value); }
        }

        // Using a DependencyProperty as the backing store for Messages.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty MessagesProperty =
            DependencyProperty.Register("Messages", typeof(ObservableCollection<string>), typeof(MainWindow), new PropertyMetadata(new ObservableCollection<string>()));



        private void Show(string message)
        {
            Messages.Add($"{DateTime.Now.ToString("HH:mm:ss,ffff")}: {message}");
            while (Messages.Count > 20) Messages.RemoveAt(0);
        }
    }
}

using System;
using System.Reactive.Subjects;
using System.Windows;

namespace RxWpfApp
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private static SubjectBase<string> _subject = new ReplaySubject<string>();

        public IObservable<string> Hub => _subject;
        public IObserver<string> Log => _subject;

        protected override void OnStartup(StartupEventArgs e)
        {
            Log.OnNext("App starting up");
            base.OnStartup(e);
            Log.OnNext("Create Main Window");
            MainWindow = new MainWindow();
            Log.OnNext("Show Main Window");
            MainWindow.Show();
        }
    }
}

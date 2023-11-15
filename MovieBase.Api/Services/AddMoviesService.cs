﻿using Microsoft.AspNetCore.SignalR;
using MovieBase.Common;
using MovieBase.Data;
using System.Diagnostics;

namespace MovieBase.Api.Services;

public class AddMoviesService : IHostedService
{
    private readonly IServiceProvider serviceProvider;

    public AddMoviesService(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }
    public Task StartAsync(CancellationToken cancellationToken)
    {
        Trace.WriteLine("Started");
        Run();
        return Task.CompletedTask;
    }

    private async void Run()
    {
        while (true)
        {
            await Task.Delay(5000);
            using (var scope = serviceProvider.CreateScope())
            {
                using var db = scope.ServiceProvider.GetRequiredService<MovieContext>();
                await db.Movies.AddAsync(new Movie { Title = $"New Movie released at {DateTime.Now}" });
                await db.SaveChangesAsync();

                var hub = scope.ServiceProvider.GetRequiredService<IHubContext<MessageHub>>();
                await hub.Clients.All.SendAsync("message", $"New Movie released at {DateTime.Now}");
            }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        Trace.WriteLine("Stopped");
        return Task.CompletedTask;
    }
}

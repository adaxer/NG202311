
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MovieBase.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MovieBase.Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MovieBase.Api;

public class ApiProgram
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
        });

        builder.Services.AddControllers()
            .AddNewtonsoftJson()
            .AddXmlSerializerFormatters();


        builder.Services.AddAuthorization();
        builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("AppDb"));
        builder.Services.AddIdentityApiEndpoints<IdentityUser>()
                        .AddEntityFrameworkStores<AppDbContext>();


        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<MovieContext>(b => b.UseInMemoryDatabase("MoviesInMemory.db"));

        builder.Services.AddHostedService<AddMoviesService>();
        builder.Services.AddAutoMapper(options => options.AddProfile<MapperProfile>());
        builder.Services.AddSignalR(c => c.KeepAliveInterval = TimeSpan.FromSeconds(10));


        ////////////////////////////////////////////

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        //     app.UseAuthentication();
        app.UseRouting();
        app.UseCors("CorsPolicy");
        app.UseAuthorization();

#pragma warning disable ASP0014 // Suggest using top level route registrations
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<MessageHub>("/messages");
        });
#pragma warning restore ASP0014 // Suggest using top level route registrations

        // Adds /register, /login and /refresh endpoints
        app.MapIdentityApi<IdentityUser>();

        app.Run();
    }
}


class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}

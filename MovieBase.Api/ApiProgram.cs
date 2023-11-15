
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MovieBase.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MovieBase.Api.Services;
using AutoMapper;

namespace MovieBase.Api;

public class ApiProgram
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //.AddJwtBearer(options =>
        //{
        //    options.Authority = "https://localhost:5555";  // Your IdentityServer's address
        //    options.RequireHttpsMetadata = false; // Use this for development, turn it on for production
        //    options.TokenValidationParameters.ValidateAudience = false;
        //    options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
        //});

        //builder.Services.AddAuthorization(options =>
        //{
        //    options.AddPolicy("Admin", policy =>
        //    {
        //        policy
        //            .RequireRole("admin")
        //            .RequireClaim(ClaimTypes.Email);
        //    });
        //});

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
        app.UseCors("CorsPolicy");
        app.UseRouting();
        app.UseAuthorization();

#pragma warning disable ASP0014 // Suggest using top level route registrations
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<MessageHub>("/messages");
        });
#pragma warning restore ASP0014 // Suggest using top level route registrations

        app.Run();
    }
}

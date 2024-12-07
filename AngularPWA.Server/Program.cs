using Microsoft.Extensions.FileProviders;

WebApplicationOptions o = new()
{
    WebRootPath = "wwwroot/browser"
};
var builder = WebApplication.CreateBuilder(o);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
string APP_PATH = "../angularpwa.client/dist";
var directory = Path.Combine(Directory.GetCurrentDirectory(), APP_PATH);
app.UseStaticFiles(); //new StaticFileOptions()
//{
//    FileProvider = new PhysicalFileProvider(directory)
//});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

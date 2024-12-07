using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Net.Http.Json;

namespace PantryInventory.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : Controller
{
    private static readonly string[] Items = new[]
    {
        "Milk", "Bread", "Eggs", "Juice", "Sugar"
    };
    private static readonly string[] Descriptions = new[]
    {
        "Milk", "Bread", "Eggs", "Juice", "Sugar"
    };

    [HttpGet(Name = "Pantry")]
    public async Task<IEnumerable<InventoryItem>> Get(string upc)
    {
        // https://api.upcitemdb.com/prod/trial/lookup?upc=0885909950805

        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri("https://api.upcitemdb.com");
        IDictionary<string, string> query = new Dictionary<string, string>
        {
            ["upc"] = upc,
        };
        var response = await client.GetAsync(QueryHelpers.AddQueryString("/prod/trial/lookup", query));
        UpcResponse? result = null;
        if (response.IsSuccessStatusCode)
        {
            result = await response.Content.ReadFromJsonAsync<UpcResponse>();
        }
        if (result != null && result.items?.Count > 0)
        {
            return new List<InventoryItem>{ new InventoryItem
            {
                Id = Guid.NewGuid(),
                Name = result.items[0].title,
                Description = result.items[0].description
            }};
        }
        else { return Enumerable.Empty<InventoryItem>(); }
    }


    [HttpPost(Name = "subscribe")]
    public async Task StoreSubscriber(string upc)
    {
        Console.WriteLine(upc);
    }
}

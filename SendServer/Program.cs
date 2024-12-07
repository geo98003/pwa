using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SendServer;
using System.Text;
using System.Text.Json;
using WebPush;


var connString = "";
var containerName = "subscriptions";

var blobClient = new BlobServiceClient(connString);
var conClient = blobClient.GetBlobContainerClient(containerName);

var listOfSubs = conClient.GetBlobs();

foreach (BlobItem sub in listOfSubs)
{
    Console.WriteLine(sub.Name);
    var client = conClient.GetBlobClient(sub.Name);
    using MemoryStream memoryStream = new MemoryStream();
    await client.DownloadToAsync(memoryStream);
    
    var pushSub = JsonSerializer.Deserialize<CachePushSub>(Encoding.ASCII.GetString(memoryStream.ToArray()));

    if (pushSub != null)
    {
        Console.WriteLine(pushSub.endpoint);
        PushSubscription subscription = new(pushSub.endpoint, pushSub.keys.p256dh, pushSub.keys.auth);

        var subject = "mailto:bjgeorge@gmail.com";
        var publicKey = "";
        var privateKey = "";

        var vapidDetails = new VapidDetails(subject, publicKey, privateKey);

        var webPushClient = new WebPushClient();
        try
        {
            webPushClient.SendNotification(subscription, "Time For Lunch", vapidDetails);
        }
        catch (Exception exception)
        {
            // Log error
            Console.WriteLine(exception.Message);
        }
    }

}



return;
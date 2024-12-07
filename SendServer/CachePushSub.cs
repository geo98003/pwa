using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SendServer;

public class CachePushSub
{
    public string endpoint { get; set; }
    public string expirationTime { get; set; }
    public PushKey keys { get; set; }
}

public class PushKey
{
    public string p256dh { get; set; }
    public string auth { get; set; }
}

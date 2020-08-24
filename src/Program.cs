using System;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Common;
using Statiq.Feeds;
using Statiq.Web;

namespace src
{
    internal static class Program
    {
        private static Task<int> Main(string[] args)
        {
            return Bootstrapper
                .Factory
                .CreateWeb(args)
                .AddHostingCommands()
                .AddSetting(Keys.LinkLowercase, true)
                .AddSetting(Keys.LinksUseHttps, true)
                .AddSetting(Keys.Host, "alexander@unexpectedeof.net")
                .AddSetting(Keys.Title, "unexpectedeof")
                .AddSetting(FeedKeys.Author, "Alexander Hagerman")
                .AddSetting(FeedKeys.Description, "Notes from building things.")
                .AddSetting(FeedKeys.Copyright, DateTime.UtcNow.Year.ToString())
                .RunAsync();
        }
    }
}

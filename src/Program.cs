using System;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Common;
using Statiq.Feeds;

namespace src
{
    internal static class Program
    {
        private static Task<int> Main(string[] args)
        {
            return Bootstrapper
                .Factory
                .CreateDefault(args)
                .AddSetting(Keys.LinkLowercase, true)
                .AddSetting(Keys.LinksUseHttps, true)
                .AddSetting(Keys.LinkHideExtensions, false)
                .AddSetting(Keys.LinkHideIndexPages, false)
                .AddSetting(Keys.Host, "alexander@unexpectedeof.net")
                .AddSetting(Keys.Title, "UnexpectedEOF")
                .AddSetting(FeedKeys.Author, "Alexander Hagerman")
                .AddSetting(FeedKeys.Description, "Notes from building things.")
                .AddSetting(FeedKeys.Copyright, DateTime.UtcNow.Year.ToString())
                .RunAsync();
        }
    }
}

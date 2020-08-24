using System.Linq;
using src.Extensions;
using Statiq.Common;
using Statiq.Core;
using Statiq.Feeds;
using Statiq.Handlebars;

namespace src.Pipelines
{
    public class TagsPipeline : ApplyLayoutPipeline
    {
        public TagsPipeline()
        {
            Dependencies.Add(nameof(BlogPostPipeline));

            InputModules = new ModuleList
            {
                new ReadFiles("_tag.hbs")
            };

            ProcessModules = new ModuleList
            {
                new MergeDocuments
                {
                    new ReplaceDocuments(nameof(BlogPostPipeline)),
                    new GroupDocuments("Tags")
                }.Reverse(),
                new SetDestination(Config.FromDocument(doc => new NormalizedPath($"./tags/{doc.GetString(Keys.GroupKey)}.html"))),
                new OptimizeFileName(),
                new RenderHandlebars()
                    .WithModel(Config.FromDocument((doc, context) => new
                    {
                        title = doc.GetString(Keys.GroupKey),
                        posts = doc.GetChildren()
                            .OrderByDescending(x => x.GetDateTime(FeedKeys.Published))
                            .Select(x => x.AsPost(context)),
                    }))
            };

            OutputModules = new ModuleList
            {
                new WriteFiles()
            };
        }
    }
}
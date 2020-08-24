using System;
using src.Extensions;
using System.Linq;
using Statiq.Common;
using Statiq.Core;
using Statiq.Feeds;
using Statiq.Handlebars;

namespace src.Pipelines
{
    public abstract class ApplyLayoutPipeline : Pipeline
    {
        protected ApplyLayoutPipeline()
        {
            PostProcessModules = new ModuleList
            {
                new SetMetadata("template", Config.FromContext(async ctx => await ctx.Outputs
                    .FromPipeline(nameof(LayoutPipeline))
                    .First(x => x.Source.FileName == "layout.hbs")
                    .GetContentStringAsync())),
                new RenderHandlebars("template")
                    .WithModel(Config.FromDocument(async (doc, ctx) => new
                    {
                        title = doc.GetString(Keys.Title),
                        body = await doc.GetContentStringAsync(),
                        link = ctx.GetLink(doc),
                        year = ctx.Settings.GetString(FeedKeys.Copyright),
                        tags = ctx.Outputs.FromPipeline(nameof(TagsPipeline))
                                                    .OrderByDescending(x => x.GetChildren().Count)
                                                    .ThenBy(x => x.GetString(Keys.GroupKey))
                                                    .Take(10)
                                                    .Select(x => x.AsTag(ctx))
                    })),
                new SetContent(Config.FromDocument(x => x.GetString("template")))
            };
        }
    }
}
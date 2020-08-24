using System.Linq;
using site.Extensions;
using Statiq.Common;
using Statiq.Core;
using Statiq.Feeds;
using Statiq.Handlebars;
using Statiq.Html;
using Statiq.Markdown;
using Statiq.Yaml;

namespace site.Pipelines
{
    public class ContentPipeline: ApplyLayoutPipeline
    {
        public ContentPipeline()
        {
            InputModules = new ModuleList
            {
                new ReadFiles("*.md")
            };

            ProcessModules = new ModuleList
            {
                    new ExtractFrontMatter(new ParseYaml()),
                    new RenderMarkdown(),
                    new SetDestination(".html")
            };

            // PostProcessModules = PostProcessModules.Prepend(
            //     new SetMetadata("template",
            //         Config.FromContext(async ctx =>
            //             await ctx.FileSystem.GetInputFile("_content.hbs").ReadAllTextAsync())),
            //     new RenderHandlebars("template")
            //         .WithModel(Config.FromDocument(async (doc, context) => new
            //         {
            //             title = doc.GetString(Keys.Title),
            //             body = await doc.GetContentStringAsync(),
            //         })),
            //     new SetContent(Config.FromDocument(x => x.GetString("template"))));
            //
            OutputModules = new ModuleList
            {
                new WriteFiles()
            };
        }
    }
}

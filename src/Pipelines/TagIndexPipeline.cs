using System.Linq;
using src.Extensions;
using Statiq.Common;
using Statiq.Core;
using Statiq.Handlebars;

namespace src.Pipelines
{
    public class TagIndexPipeline : ApplyLayoutPipeline
    {
        public TagIndexPipeline()
        {
            Dependencies.Add(nameof(TagsPipeline));
            
            InputModules = new ModuleList
            {
                new ReadFiles("_tagIndex.hbs")
            };

            ProcessModules = new ModuleList
            {
                new SetDestination(Config.FromValue(new NormalizedPath("./tags/index.html"))),
                new RenderHandlebars()
                    .WithModel(Config.FromContext(context => new
                    {
                        tags = context.Outputs.FromPipeline(nameof(TagsPipeline))
                            .OrderBy(x => x.GetString(Keys.GroupKey))
                            .Select(x => x.AsTag(context)),
                    }))
            };

            OutputModules = new ModuleList
            {
                new WriteFiles()
            };
        }
    }
}
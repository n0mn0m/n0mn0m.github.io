# Notes for my future self

## TODO

Increase font size
Change the social/tags menu to only display on non post pages

## Commands

```
dotnet restore
dotnet cake --target=Preview

mdl -c=.mdlrc input/posts/*.md
```

## Order

1. BlogPostPipeline -> read *.md files
2. TagsPipeline -> gets tags from front matter
3. TagIndexPipeline -> create tag index pages
4. ArchivePipeline -> create full posts page
5. IndexPipeline -> create index page with top x most recent post, tags, etc
6. FeedsPipeline -> create Atom and RSS
7. AssetsPipeline -> copy assets
8. LayoutPipeline -> read handblebar templates and template front matter
9. ApplyLayoutPipeline -> Render template with layout
10. Revist pipelines with `PostProcess` step giving access to all other
 pipeline run data.
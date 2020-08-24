var target = Argument("target", "Build");
var configuration = Argument("configuration", "Release");

Task("Clean")
    .Does(() => CleanDirectory($"./src/bin/**"))
    .Does(() => CleanDirectory("./temp"))
    .Does(() => CleanDirectory("./wwwroot"))
    .Does(() => CleanDirectory("./logs"))
    .Does(() => CleanDirectory("./output"));

Task("Build")
    .Does(() => DotNetCoreRun("./src/src.csproj"));

Task("Preview")
    .Does(() => DotNetCoreRun("./src/src.csproj", new ProcessArgumentBuilder()
        .Append("preview")
        .Append("--root=/Users/n0mn0m/RiderProjects/Unexpectedeof.Blog/")));
        
Task("Run")
    .Does(() => DotNetCoreRun("./src/src.csproj", new ProcessArgumentBuilder()
        .Append("--root=/Users/n0mn0m/RiderProjects/Unexpectedeof.Blog/")
        .Append("--log-file=run_")
        .Append("--nocache")
        .Append("--serial")));

Task("Default")
    .IsDependentOn("Build");

RunTarget(target);
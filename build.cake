var target = Argument("target", "Build");
var configuration = Argument("configuration", "Release");

Task("Clean")
    .Does(() => DeleteDirectory($"./src/bin/**", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./src/logs", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./src/wwwroot", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./temp", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./output", new DeleteDirectorySettings {Recursive = true, Force = true}));

Task("Build")
    .Does(() => DotNetCoreRun("./src/src.csproj"));
        
Task("Run")
    .Does(() => DeleteDirectory("./temp",  new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./output",  new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DotNetCoreRun("./src/src.csproj", new ProcessArgumentBuilder()
        .Append("--root=/Users/n0mn0m/RiderProjects/Unexpectedeof.Blog/")
        .Append("--log-file=run_")
        .Append("--nocache")));

Task("Default")
    .IsDependentOn("Build");

RunTarget(target);
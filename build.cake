var target = Argument("target", "Build");
var configuration = Argument("configuration", "Release");
var cwd = EnvironmentVariable("PWD") ?? "NOT_SET";

Task("build")
    .Does(() => DotNetCoreRun("./src/src.csproj"));

Task("clean")
    .Does(() => DeleteDirectory($"./src/bin/**", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./src/logs", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./src/wwwroot", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./temp", new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./output", new DeleteDirectorySettings {Recursive = true, Force = true}));

Task("remove")
    .Does(() => DeleteDirectory("./temp",  new DeleteDirectorySettings {Recursive = true, Force = true}))
    .Does(() => DeleteDirectory("./output",  new DeleteDirectorySettings {Recursive = true, Force = true}));
        
Task("generate")
    .Does(() => DotNetCoreRun("./src/src.csproj", new ProcessArgumentBuilder()
        .Append($"--root={cwd}")
        .Append("--log-file=run_")
        .Append("--nocache")));

Task("default")
    .IsDependentOn("Build");

RunTarget(target);

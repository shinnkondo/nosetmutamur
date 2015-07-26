task default: %w[middleman]

task :serve do
    sh('bundle', 'exec', 'middleman')
end

task :build do
    sh('bundle', 'exec', 'middleman', 'build')
end

task :middleman do
    require 'pathname'
    ENV['BUNDLE_GEMFILE'] ||= File.expand_path("../Gemfile", Pathname.new(__FILE__).realpath)

    require 'rubygems'
    require 'bundler/setup'

    load Gem.bin_path('middleman-core', 'middleman')

end
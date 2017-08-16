# kendi-cli
适配于 smart-modular 构建方案的脚手架工具

## install
```
$ npm install kendi-cli -g
```

## usage

### init a new project
```
Usage: kendi-init <project-name>

Options:

  -c, --clone  use git clone
  --offline    use cached template
  -h, --help   output usage information
Examples:

  # create a new project with an official template
  $ kendi init my-project
```

### add a new page fragment
```
  Usage: kendi-add <page-name>


  Options:

    -c, --clone  use git clone
    -h, --help   output usage information
  Examples:

    # add a new page template
    $ cd my-project
    $ kendi add kandianPage
```
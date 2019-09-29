### Details



### Breaking Changes



### References



### Introduction to Pull Requests

<details>
<summary>
Please read before submitting your first pull request!
</summary>
<p>

Thank you for creating a pull request. We really appreciate your effort!

Here is some information to help you integrate your changes as easily as possible into the next release.

#### Title Field

The title is one of the most important aspects of a pull request. The content is shown in `CHANGELOG.md` and release notes. Therefore, be sure to summarize your changes in a short but catchy sentence. Others should be able to easily get an idea of your changes.

By adding keywords at the beginning of the title, you can control the process of merging and releasing your pull request. Here is the list of all available keywords:

- `WIP:`

  It is highly recommended to open a pull request as soon as possible. This allows discussions during code development and not just criticism after work is done.

  Please start a new pull request with the prefix `WIP:`. This signals to others that is is not yet ready to be merged into the master branch. It also prevents our bot from merging. (See section "Merging into Master" below)

  After the changes **and the pull request description** have been completed, remove this prefix. In this case, review requests may be automatically generated to ensure, e.g., the compatibility of your description with our release notes format.

- `feat:`

  A pull request with this prefix in its title is marked as a new feature. In general this creates a minor release when merging the pull request into the master branch. A label with the expected release type is added to the pull request.

- `fix:`

  A pull request with this prefix in its title is marked as a bugfix. In general this creates a patch release when merging the pull request into the master branch. A label with the expected release type is added to the pull request.

- `chore:`

  A pull request with this prefix in its title is marked as a maintenance change. In general this creates a patch release when merging the pull request into the master branch. A label with the expected release type is added to the pull request. Only `CHANGELOG.md`, but not our release notes, will be updated with information about the pull request.

You can specify the kind of pull request when you create a new one. But do not forget to prefix it with `WIP:`. Here is an example title for such a pull request:

```
WIP: feat: My super cool new feature
```

After finishing the work, you can simply remove `WIP:`.

Please do not format the `Title` field with Markdown.

#### Description Field

Besides this introduction, the description field also contains sections with the following headings which contribute to `CHANGELOG.md` and release notes:

- `Details`

  Sometimes it is not possible to explain a change with a single short line in the `Title` field. In this case, you can add a more detailed description in the `Details` section.

  You may add several paragraphs if needed and unlike the `Title` field, you can format the content with Markdown.

- `Breaking Changes`

  Please fill out this section if **and only if** your changes affect the public Interface. This creates a major release when merging the pull request into the master branch. Breaking changes are shown in an additional section of `CHANGELOG.md` and release notes. So two headings will be created: One for the bugfix/feature itself and one for the breaking changes.

  All information for the `Details` section also applies here, with one important exception:

  In contrast to the `Details` section, the first line is used as a title for the breaking change. Therefore, please add a short description first and append paragraphs for more information if needed. Do not start with a large paragraph and do not format the first line.

  Here is an example of a longer text for a breaking change:

  > This is a brief description of the breaking change (without a punctuation mark and formatting)
  >
  > In another paragraph, I add detailed information of steps needed to adapt to the new interface. I can also *format* this paragraph using Markdown.
  >
  > I can add as many paragraphs as needed.

  The first line is shown as a heading and the following paragraphs as normal text.

  Use this section only to describe the changes to the interface and how to adapt to the new version. Use the `Details` section to provide information about the bugfix/feature itself.

- `References`

  Here you can enter links to Jira oder Github. This allows you to provide more information about the background of your code changes.

  Add one link per line without any other text.

Please make sure that you leave a blank line between the headings and the beginning and end of your text.

#### Merging into Master

After all reviews have been successfully completed, you are ready to merge your pull request into the master branch. This is only possible if all required automated tests pass.

You cannot use the green "Merge" button. Instead you must add a special comment containing only the following command:

```
/merge
```

This causes our `merge bot` to merge the pull request using a commit message consisting of the various pieces of information in the `Title` and `Description` fields.

The branch is automatically deleted after a successful merge. If you do not have permissions to commit to the repository, a comment containing an error message is created.

</p>
</details>

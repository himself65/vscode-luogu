export interface IAPIProblem {
  StringPID: string
  Tags: Tag[]
  Type: number
  Sample: [string[]]
  InputFormat: string
  OutputFormat: string
  Name: string
  Hint: string
  Flag: string
  Description: string
  Background: string
  Translation?: string
}

export interface IAPITag {
  Id: number
  Name: string
  ParentId: number
}

export class Tag {
  private id = 0
  private name = ''
  private parentId = 0

  constructor (fields?: IAPITag) {
    if (!fields) {
      return
    }
    this.id = fields.Id
    this.name = fields.Name
    this.parentId = fields.ParentId
  }

  setID (Id: number) {
    this.id = Id
  }

  getID () {
    return this.id
  }

  setName (Name: string) {
    this.name = Name
  }

  getName () {
    return this.name
  }

  setParentID (ParentId: number) {
    this.parentId = ParentId
  }

  getParentID () {
    return this.parentId
  }
}

export class Problem {
  public stringPID = ''
  public tags: Tag[] = []
  public type = 0
  public sample: [string[]] = [[]]
  public inputFormat = ''
  public outputFormat = ''
  public name = ''
  public hint = ''
  public flag = ''
  public description = ''
  public background = ''
  public translation?: string

  public constructor (
    fields?: IAPIProblem
  ) {
    if (!fields) {
      return
    }
    this.stringPID = fields.StringPID
    this.tags = fields.Tags
    this.type = fields.Type
    this.sample = fields.Sample
    this.inputFormat = fields.InputFormat
    this.outputFormat = fields.OutputFormat
    this.name = fields.Name
    this.hint = fields.Hint
    this.flag = fields.Flag
    this.description = fields.Description
    this.background = fields.Background
    this.translation = fields.Translation
  }

  toHTML (): string {
    let sample = ''
    this.sample.forEach((array, index) => {
      sample += `<strong>输入${index + 1}</strong>:
                    <p>
                    ${array[0]}
                    </p>
                    <strong>输出${index + 1}</strong>:
                    <p>
                    ${array[1]}
                    </p>
                    `
    })
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${this.name}</title>
        </head>
        <article id="editor-container" style="height: 100%; width: 100%">
            <h1>${this.name}</h1>
            <h2>题目描述</h2>
            <p>${this.translation || ''}</p>
            <p>${this.background}</p>
            <p>${this.description}</p>
            <h2>输入输出格式</h2>
            <strong>输入格式</strong>
            <p>${this.inputFormat}</p>
            <strong>输出格式</strong>
            <p>${this.outputFormat}</p>
            <h2>输入输出样例</h2>
            ${sample}
            <h2>说明</h2>
            <p>${this.hint}</p>
        </article>
        </html>`
  }

  toMarkDown (): string {
    console.log(this.translation)

    let sample = ''
    this.sample.forEach((array, index) => {
      sample += `输入${index + 1} : \n \`\`\` \n ${array[0]} \n \`\`\` \n 输出${index + 1} : \n \`\`\` \n ${array[1]} \n \`\`\` \n`
    })
    return ` # ${this.name}| [${this.stringPID}](https://www.luogu.org/problemnew/show/${this.stringPID}) \n \n ${this.translation || ''} \n \n ## 题目描述 \n \n ${this.background} \n \n ${this.description} \n \n ## 输入输出格式 \n \n **输入格式** \n \n ${this.inputFormat} \n \n **输出格式** \n \n ${this.outputFormat} \n \n ## 输入输出样例 \n \n ${sample} \n \n ## 说明 \n \n ${this.hint} \n`
  }
}

export default Problem

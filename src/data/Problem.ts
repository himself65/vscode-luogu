export interface IAPIProblem {
    StringPID: string;
    Tags: Tag[];
    Type: number;
    Sample: [string[]];
    InputFormat: string;
    OutputFormat: string;
    Name: string;
    Hint: string;
    Flag: string;
    Description: string;
    Background: string;
}

export interface IAPITag {
    Id: number;
    Name: string;
    ParentId: number;
}

export class Tag {
    private id: number = 0;
    private name: string = "";
    private parentId: number = 0;

    constructor(fields?: IAPITag) {
        if (!fields) { return; }
        this.id = fields.Id;
        this.name = fields.Name;
        this.parentId = fields.ParentId;
    }

    setID(Id: number) {
        this.id = Id;
    }

    getID() {
        return this.id;
    }

    setName(Name: string) {
        this.name = Name;
    }

    getName() {
        return this.name;
    }

    setParentID(ParentId: number) {
        this.parentId = ParentId;
    }

    getParentID() {
        return this.parentId;
    }
}

export class Problem {
    private stringPID: string = "";
    private tags: Tag[] = [];
    private type: number = 0;
    private sample: [string[]] = [[]];
    private inputFormat: string = "";
    private outputFormat: string = "";
    private name: string = "";
    private hint: string = "";
    private flag: string = "";
    private description: string = "";
    private background: string = "";

    public constructor(
        fields?: IAPIProblem
    ) {
        if (!fields) { return; }
        this.stringPID = fields.StringPID;
        this.tags = fields.Tags;
        this.type = fields.Type;
        this.sample = fields.Sample;
        this.inputFormat = fields.InputFormat;
        this.outputFormat = fields.OutputFormat;
        this.name = fields.Name;
        this.hint = fields.Hint;
        this.flag = fields.Flag;
        this.description = fields.Description;
        this.background = fields.Background;
    }

    toHTML(): string {
        let sample: string = '';
        this.sample.forEach((array, index) => {
            sample += `<strong>输入${index + 1}</strong>:
                    <p>
                    ${array[0]}
                    </p>
                    <strong>输出${index + 1}</strong>:
                    <p>
                    ${array[1]}
                    </p>
                    `;
        });
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${this.name}</title>
        </head>
        <div id="editor-container" style="height: 100%; width: 100%">
        <h1>${this.name}</h1> 
        <h2>题目背景</h2>
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
        </div>
        </html>`;
    }

    toMarkDown(): string {
        let sample: string = '';
        this.sample.forEach((array, index) => {
            sample += `输入${index + 1} : \n \`\`\` \n ${array[0]} \n \`\`\` \n 输出${index + 1} : \n \`\`\` \n ${array[1]} \n \`\`\` \n`;
        });
        return ` # ${this.name} \n ## 题目背景 \n ${this.background} \n${this.description} \n ## 输入输出格式 \n **输入格式** \n ${this.inputFormat} \n **输出格式** \n ${this.outputFormat} \n ## 输入输出样例 \n ${sample} \n ## 说明 \n ${this.hint} \n`;
    }

    setType(Type: number) {
        this.type = Type;
    }

    getType() {
        return this.type;
    }

    setSample(Sample: [string[]]) {
        this.sample = Sample;
    }

    getSample() {
        return this.sample;
    }

    setStringPID(StringPID: string) {
        this.stringPID = StringPID;
    }

    getStringPID() {
        return this.stringPID;
    }

    setTags(Tags: Tag[]) {
        this.tags = Tags;
    }

    getTags() {
        return this.tags;
    }

    setBackground(Background: string) {
        this.background = Background;
    }

    getBackground() {
        return this.background;
    }

    setDescription(Description: string) {
        this.description = Description;
    }

    getDescription() {
        return this.description;
    }

    setInputFormat(InputFormat: string) {
        this.inputFormat = InputFormat;
    }

    getInputFormat(): string {
        return this.inputFormat;
    }

    setFlag(Flag: string) {
        this.flag = Flag;
    }

    getFlag() {
        return this.flag;
    }

    setHint(Hint: string) {
        this.hint = Hint;
    }

    getHint() {
        return this.hint;
    }

    setOutputFormat(OutputFormat: string) {
        this.outputFormat = OutputFormat;
    }

    getOutputFormat() {
        return this.outputFormat;
    }

    setName(Name: string) {
        this.name = Name;
    }

    getName() {
        return this.name;
    }
}
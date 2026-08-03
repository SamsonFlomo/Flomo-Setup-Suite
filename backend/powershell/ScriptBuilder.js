class ScriptBuilder {


constructor(){

    this.lines=[];

}


add(command){

    if(command){

        this.lines.push(command);

    }

}


build(){

    return this.lines.join("\n\n");

}


}


export default ScriptBuilder;
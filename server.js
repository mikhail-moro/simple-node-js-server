const http = require('http');
const url = require('url');
const hostname = '127.0.0.1'
const port = 3000


async function getMeetings(start_time, end_time) {
    let data = await require("./data.json")
    let body = {}

    start_time = Date.parse(start_time)
    end_time = Date.parse(end_time)

    for (let i of data) {
        let meeting_start_time = Date.parse(i["start"])
        let meeting_end_time = Date.parse(i["end"])

        if (start_time < meeting_start_time & end_time > meeting_end_time) {
            let item = {}
            let date = i["start"].slice(0, 10)

            if (Object.keys(body).indexOf(date) == -1) {
                body[date] = []
            }

            item["module"] = i["info"]["moduleName"]
            item["name"] = i["name"]
            item["theme"] = i["info"]["theme"]
            item["type"] = i["info"]["type"]
            item["aud"] = i["info"]["aud"]
            item["link"] = i["info"]["link"]
            item["teachers"] = i["info"]["teachersNames"]
            item["groups"] = i["info"]["groupName"]
            item["startTime"] = i["start"].slice(11, 16)
            item["endTime"] = i["end"].slice(11, 16)
            item["color"] = i["color"]

            body[date].push(item)
        }
    }

    return JSON.stringify(body)
}


http.createServer((request, response) => {
    if (request.method == "GET") {
        let data = url.parse(request.url, true)["query"];
        let start_time = data["start_time"];
        let end_time = data["end_time"];

        getMeetings(start_time, end_time)
            .then(
                (result) => {
                    response.writeHead(200, {'Content-Type': 'text/plain'});

                    response.write(result);

                    response.end();
                }
            )
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
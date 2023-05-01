const Generate = require('../services/Generate');
const { trigger } = require("../services/Dispatch");
const { render } = require("../utils");

module.exports = async function (req, res) {
    try {
        const search_id = req.params.search_id;
        const stream = await Generate(search_id);
        for await (const result of stream) {
            const html = await render(res.render.bind(res), "partials/_result", { result });
            trigger(search_id, html);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Error");
    } finally {
        res.end();
    }
}
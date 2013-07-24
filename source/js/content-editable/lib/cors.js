var cors = new function ()
{
    this.url;
    this.data;
    this.callback;

    this.post = function (request)
    {

        this.url = request.url;
        this.data = request.data;
        this.callback = request.success;

        if ($.browser.msie && parseInt($.browser.version, 10) < 10)
        {
            var xdr, callback, params;

            // as in jquery
            if (this.beforeSend)
            {
                this.beforeSend();
            }

            params = '';
            for (key in this.data)
            {
                if (typeof this.data[key] == 'object')
                {
                    this.data[key] = JSON.stringify(this.data[key]);
                }
                params = params+'&'+key+'='+this.data[key];
            }

            xdr = new XDomainRequest();
            xdr.open('post', this.url);
            xdr.send(params);

            callback = this.callback;
            xdr.onload = function()
            {
                    var response = $.parseJSON(xdr.responseText);

                    callback(response, 'success');
            }
        }
        else
        {
            // browsers go here
            this.jquery_request('post');
        }
    }

    this.jquery_request = function (type)
    {
        $.ajax({
            'type': type,
            'url': this.url,
            'data': this.data,
            'success': this.callback       
        });
    }
}
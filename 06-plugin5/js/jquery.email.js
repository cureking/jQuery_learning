/**
 * Created by AoSnow on 2017/10/26.
 */

(function( jq )
{
	jq.EmailPlugin = function( options )
	{
		let self = this;
		let $html = jq( "<div class=\"popular\"><ul></ul></div>" );
		let _default = {
			email: [ "126.com", "163.com", "sina.com", "yeah.net" ]
		};

		let _current;

		this.setOptions = function( options )
		{
			_current = jq.extend( {}, _default, options );

			// 合并邮箱域名列表
			for( let i = 0; i < _default.email.length; i++ )
			{
				if( _current.email.indexOf( _default.email[ i ] ) === -1 )
				{
					_current.email.push( _default.email[ i ] );
				}
			}

			return _current;
		};

		this.setOptions( options );

		this.init = function( target )
		{
			let $t = jq( target );
			$t.on( "keyup", _textHandler );
			$t.on( "focus blur", _focusHandler );
		};

		function _textHandler( event )
		{
			let $t = jq( event.currentTarget );
			let val = jq.trim( $t.val() );

			if( val.length > 0 )
			{
				let list = self.parseList( event.currentTarget );

				if( list.length === 0 )
				{
					self.hide();
					return;
				}

				self.setList( list );
				self.show( event.currentTarget );
				self.rePosition( event.currentTarget );
			}
			else
			{
				self.hide();
			}
		}

		function _focusHandler( event )
		{
			let $t = jq( event.currentTarget );
			let val = jq.trim( $t.val() );

			switch( event.type )
			{
				case "focus":
				{
					if( val.length > 0 )
					{
						self.setList( self.parseList( event.currentTarget ) );
						self.show( event.currentTarget );
						self.rePosition( event.currentTarget );
					}
					break;
				}
				case "blur":
				{
					self.hide();
					break;
				}
			}
		}

		this.parseList = function( target )
		{
			let $t = jq( target );
			let val = jq.trim( $t.val() );
			let newList;

			if( val.length > 0 )
			{
				let user = val;
				let domain = "";

				if( user.indexOf( "@" ) === -1 )
				{
					// 第一种：无@
					newList = _current.email.map( function( a )
					{
						return user + "@" + a;
					} );
				}
				else
				{
					// 第二种：有@
					let tmp = user.split( "@" );
					user = tmp[ 0 ];
					domain = tmp[ 1 ];

					let filter = _current.email.filter( function( a )
					{
						return a.indexOf( domain ) === 0;
					} );

					newList = filter.map( function( a )
					{
						return user + "@" + a;
					} );
				}

			}

			return newList;
		};

		this.setList = function( list )
		{
			let $ul = $html.find( "ul" );
			$ul.empty();

			if( list instanceof Array )
			{
				list.map( function( a )
				{
					$ul.append( "<li>" + a + "</li>" );
				} );
			}
		};

		this.show = function( target )
		{
			let $t = jq( target );

			$html.css( {
				"min-width": $t.outerWidth() + "px"
			} );
			$html.appendTo( "body" );
		};

		this.rePosition = function( target )
		{
			let $t = jq( target );
			let offset = $t.offset();

			$html.offset( {
				left: offset.left,
				top: offset.top + $t.outerHeight()
			} );
		};

		this.hide = function()
		{
			$html.remove();
		};
	};

	jq.emailPlugin = new jq.EmailPlugin();

	jq.fn.email = function()
	{
		this.each( function( index, element )
		{
			jq.emailPlugin.init( element );
		} );

		return this;
	};
})( jQuery );

$( document ).ready( function()
{
	$.emailPlugin.setOptions( { email: [ "qq.com", "sohu.com", "126.com" ] } );
	$( "input[data-email='true']" ).email();
} );


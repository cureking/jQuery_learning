(function( jq )
{
	jq.Tabable = function( element, option )
	{
		let _default = {
			type: "click"// click, mouseenter, mouseover
		};

		let _current = jq.extend( {}, _default, option );
		let $target = jq( element );

		this.init = function( element )
		{
			$target = jq( element );

			// 初始化 tab 和 content 的绑定
			// ...

			// 默认显示第一个 tab
			if( jq( ".nav-tabs > li.active" ).length <= 0 )
			{
				jq( ".nav-tabs > li:first" ).addClass( "active" );
				jq( ".tab-content > .tab-pane:first" ).addClass( "active" );
			}

			// 监听触发事件
			$target.find( "[data-toggle='tab']" ).parent().on( _current.type, this.toggleHandler );
		};

		this.toggleHandler = function( event )
		{
			event.preventDefault();

			let $target = jq( event.currentTarget );
			if( $target[ 0 ] === jq( ".nav-tabs > li.active" )[ 0 ] ) return;

			let $id = $target.find( "[data-toggle='tab']" ).attr( "href" );
			let $content = jq( $id );

			console.log( $target[ 0 ], jq( ".nav-tabs > li.active" )[ 0 ] );

			jq( ".nav-tabs > li.active" ).removeClass( "active" );
			jq( ".tab-content > .tab-pane.active" ).removeClass( "active" );

			$target.addClass( "active" );
			$content.addClass( "active" );
		};
	};

	jq.fn.tabable = function()
	{
		this.each( function( index, element )
		{
			// 为 element 附加 tab 控件功能，且彼此独立无关联
			let tb = new jq.Tabable();
			tb.init( element );
		} );

		return this;
	};

})( jQuery );

$( document ).ready( function()
{
	$( ".tabable" ).tabable();
} );
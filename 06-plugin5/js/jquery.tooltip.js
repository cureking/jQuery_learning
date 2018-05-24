/**
 * Created by AoSnow on 2017/10/24.
 */
$.Tooltip = function( option )
{
	let self = this;

	// 用户参数部分
	let _default = {
		maxWidth: 300,
		direct: "top",// top,bottom,left,right
		content: "tooltip...",
		animate: true
	};

	let _current = $.extend( {}, _default, option );

	// 功能部分
	let $html = $( "<div class='tooltip'></div>" );
	let $target;

	// 初始化
	this.bind = function( target )
	{
		// 绑定事件
		target.on( "mouseenter mouseleave", _mouseHandler );
	};

	this.init = function( target )
	{
		$target = target;
		console.log( $target );

		// 设计哪些属性被插件所支持解析
		let attrs = this.parse( $target );

		// 合并到参数集合
		let current = $.extend( {}, _current, attrs );
		console.log( current.maxWidth );
		// 应用参数生效
		$html.css( {
			"position": "absolute",
			"max-width": current.maxWidth + "px"
		} );

		$html.html( current.content );
	};

	function _mouseHandler( event )
	{
		switch( event.type )
		{
			case "mouseenter":
			{
				self.init( $( this ) );
				self.show();
				break;
			}
			case "mouseleave":
			{
				self.hide();
				break;
			}
		}
	}

	this.parse = function( target )
	{
		let attrs = {};

		let content = target.attr( "data-content" );
		content && (attrs[ "content" ] = content);

		attrs[ "direct" ] = target.attr( "data-direct" );

		let maxWidth = parseInt( target.attr( "data-max-width" ) );
		maxWidth && ( attrs[ "maxWidth" ] = maxWidth );

		return attrs;
	};

	// 显示
	this.show = function()
	{
		$( "body" ).append( $html );
		this.rePosition();

		if( _current.animate )
		{
			$html.hide();
			$html.finish().show( 1000 );
		}
	};

	// 隐藏
	this.hide = function()
	{
		if( _current.animate )
		{
			$html.finish().hide( 1000, function()
			{
				$html.remove();
			} );
		}
		else
		{
			$html.remove();
		}
	};

	// 定位
	this.rePosition = function()
	{
		let offset = $target.offset();
		let left = 0;
		let top = 0;

		// 隐含问题：必须让元素的方向响应不同
		switch( _current.direct )
		{
			case "left":
			{
				break;
			}
			case "right":
			{
				break;
			}
			case "bottom":
			{
				break;
			}
			default:
			{
				left = offset.left + ($target.outerWidth() - $html.outerWidth() >> 1);
				top = offset.top - $html.outerHeight() - 10;
			}
		}
		// 应用方向
		$html.offset( { left: left, top: top } );
	};
};
$.tooltip = new $.Tooltip();

$( document ).ready( function()
{
	let $toggles = $( "[data-toggle='tooltip']" );

	$toggles.each( function( index, element )
	{
		// 初始化
		$.tooltip.bind( $( element ) );
	} );
} );

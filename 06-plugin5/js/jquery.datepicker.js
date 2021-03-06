(function( c )
{
	c.Zebra_DatePicker = function( W, E )
	{
		var ja = {
				always_show_clear: !1,
				always_visible: !1,
				days: "日 一 二 三 四 五 六".split( " " ),
				days_abbr: !1,
				direction: 0,
				disabled_dates: !1,
				first_day_of_week: 1,
				format: "Y-m-d",
				inside: !0,
				lang_clear_date: "Clear",
				months: "1 2 3 4 5 6 7 8 9 10 11 12".split( " " ),
				months_abbr: !1,
				offset: [ 5, 120 ],
				pair: !1,
				readonly_element: !0,
				show_icon: 0,
				show_week_number: !1,
				start_date: !1,
				view: "days",
				weekend_days: [ 0, 6 ],
				zero_pad: !0,
				onChange: null,
				onClear: null,
				onSelect: null
			},
			q, g, s, z, B, F, G, I, X, Q, Z, p, t, y, u, m, R, J, K, Y, S, v, w, T, L, O, ca, da, ea, C, $, a = this;
		a.settings = {};
		var n = c( W ),
			ga = function( b )
			{
				b || (a.settings = c.extend( {}, ja, E ));
				a.settings.readonly_element && n.attr( "readonly", "readonly" );
				var d = {
						days: [ "d", "j", "D" ],
						months: [ "F", "m", "M", "n", "t" ],
						years: [ "o", "Y", "y" ]
					},
					l = !1,
					f = !1,
					j = !1;
				for( type in d ) c.each( d[ type ], function( b, c )
				{
					-1 < a.settings.format.indexOf( c ) && ("days" == type ? l = !0 : "months" == type ? f = !0 : "years" == type && (j = !0))
				} );
				C = l && f && j ? [ "years", "months", "days" ] : !l && f && j ? [ "years", "months" ] : !l && !f && j ? [ "years" ] : [ "years", "months", "days" ];
				-1 == c.inArray( a.settings.view, C ) && (a.settings.view = C[ C.length - 1 ]);
				Y = [];
				c.isArray( a.settings.disabled_dates ) && 0 < a.settings.disabled_dates.length && c.each( a.settings.disabled_dates, function()
				{
					for( var a = this.split( " " ), b = 0; 4 > b; b++ )
					{
						a[ b ] || (a[ b ] = "*");
						a[ b ] = -1 < a[ b ].indexOf( "," ) ? a[ b ].split( "," ) : Array( a[ b ] );
						for( var d = 0; d < a[ b ].length; d++ )
							if( -1 < a[ b ][ d ].indexOf( "-" ) )
							{
								var e = a[ b ][ d ].match( /^([0-9]+)\-([0-9]+)/ );
								if( null != e )
								{
									for( var f = k( e[ 1 ] ); f <= k( e[ 2 ] ); f++ ) -1 == c.inArray( f, a[ b ] ) && a[ b ].push( f + "" );
									a[ b ].splice( d, 1 );
								}
							}
						for( d = 0; d < a[ b ].length; d++ ) a[ b ][ d ] = isNaN( k( a[ b ][ d ] ) ) ? a[ b ][ d ] : k( a[ b ][ d ] );
					}
					Y.push( a );
				} );
				var d = new Date,
					h = !a.settings.reference_date ? n.data( "zdp_reference_date" ) && void 0 != n.data( "zdp_reference_date" ) ? n.data( "zdp_reference_date" ) : d : a.settings.reference_date,
					e, A;
				w = v = void 0;
				p = h.getMonth();
				X = d.getMonth();
				t = h.getFullYear();
				Q = d.getFullYear();
				y = h.getDate();
				Z = d.getDate();
				if( !0 === a.settings.direction ) v = h;
				else
					if( !1 === a.settings.direction ) w = h, O = w.getMonth(), L = w.getFullYear(), T = w.getDate();
					else
						if( !c.isArray( a.settings.direction ) && P( a.settings.direction ) && 0 < k( a.settings.direction ) || c.isArray( a.settings.direction ) && (!0 === a.settings.direction[ 0 ] || P( a.settings.direction[ 0 ] ) && 0 < a.settings.direction[ 0 ] || (e = U( a.settings.direction[ 0 ] ))) && (!1 === a.settings.direction[ 1 ] || P( a.settings.direction[ 1 ] ) && 0 <= a.settings.direction[ 1 ] || (A = U( a.settings.direction[ 1 ] ))) ) v = e ? e : new Date( t, p, y + (!c.isArray( a.settings.direction ) ? k( a.settings.direction ) : k( !0 === a.settings.direction[ 0 ] ? 0 : a.settings.direction[ 0 ] )) ), p = v.getMonth(), t = v.getFullYear(), y = v.getDate(), A && +A >= +v ? w = A : !A && (!1 !== a.settings.direction[ 1 ] && c.isArray( a.settings.direction )) && (w = new Date( t, p, y + k( a.settings.direction[ 1 ] ) )), w && (O = w.getMonth(), L = w.getFullYear(), T = w.getDate());
						else
							if( !c.isArray( a.settings.direction ) && P( a.settings.direction ) && 0 > k( a.settings.direction ) || c.isArray( a.settings.direction ) && (!1 === a.settings.direction[ 0 ] || P( a.settings.direction[ 0 ] ) && 0 > a.settings.direction[ 0 ]) && (P( a.settings.direction[ 1 ] ) && 0 <= a.settings.direction[ 1 ] || (e = U( a.settings.direction[ 1 ] ))) ) w = new Date( t, p, y + (!c.isArray( a.settings.direction ) ? k( a.settings.direction ) : k( !1 === a.settings.direction[ 0 ] ? 0 : a.settings.direction[ 0 ] )) ), O = w.getMonth(), L = w.getFullYear(), T = w.getDate(), e && +e < +w ? v = e : !e && c.isArray( a.settings.direction ) && (v = new Date( L, O, T - k( a.settings.direction[ 1 ] ) )), v && (p = v.getMonth(), t = v.getFullYear(), y = v.getDate());
				if( D( t, p, y ) )
				{
					for( ; D( t ); ) v ? (t++, p = 0) : (t--, p = 11);
					for( ; D( t, p ); ) v ? (p++, y = 1) : (p--, y = 31), 11 < p ? (t++, p = 0, y = 1) : 0 > p && (t--, p = 11, y = 31);
					for( ; D( t, p, y ); ) v ? y++ : y--;
					d = new Date( t, p, y );
					t = d.getFullYear();
					p = d.getMonth();
					y = d.getDate();
				}
				(e = U( n.val() || (a.settings.start_date ? a.settings.start_date : "") )) && D( e.getFullYear(), e.getMonth(), e.getDate() ) && n.val( "" );
				fa( e );
				if( !a.settings.always_visible && (b || a.settings.show_icon) )
				{
					a.icon = null;
					n.addClass( "DatePicker_Icon" );
					if( n.attr( "disabled" ) )n.addClass( "disabled" );
				}
				n.bind( "click", function( b )
				{
					b.preventDefault();
					n.attr( "disabled" ) || ("none" != g.css( "display" ) ? a.hide() : a.show());
				} );
				void 0 != s && (n.is( ":visible" ) ? s.css( "display", "block" ) : s.css( "display", "none" ));
				b || (e = '<div class="Zebra_DatePicker">' +
						  '<table class="dp_header">' +
						  '<tr>' +
						  '<td class="dp_previous">&laquo;</td>' +
						  '<td class="dp_caption">&nbsp;</td>' +
						  '<td class="dp_next">&raquo;</td>' +
						  '</tr>' +
						  '</table>' +
						  '<table class="dp_daypicker"></table>' +
						  '<table class="dp_monthpicker"></table>' +
						  '<table class="dp_yearpicker"></table>' +
						  '<table class="dp_footer">' +
						  '<tr>' +
						  '<td>' + a.settings.lang_clear_date + "</td>" +
						  "</tr>" +
						  "</table>" +
						  "</div>", g = c( e ), a.datepicker = g, z = c( "table.dp_header", g ), B = c( "table.dp_daypicker", g ), F = c( "table.dp_monthpicker", g ), G = c( "table.dp_yearpicker", g ), I = c( "table.dp_footer", g ), a.settings.always_visible ? n.attr( "disabled" ) || (a.settings.always_visible.append( g ), a.show()) : c( "body" ).append( g ), g.delegate( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked, .dp_week_number)", "mouseover", function()
				{
					c( this ).addClass( "dp_hover" )
				} ).delegate( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked, .dp_week_number)", "mouseout", function()
				{
					c( this ).removeClass( "dp_hover" )
				} ), b = c( "td", z ), "firefox" == M.name ? b.css( "MozUserSelect", "none" ) : "explorer" == M.name ? b.bind( "selectstart", function()
				{
					return !1
				} ) : b.mousedown( function()
				{
					return !1
				} ), c( ".dp_previous", z ).bind( "click", function()
				{
					c( this ).hasClass( "dp_blocked" ) || ("months" == q ? m-- : "years" == q ? m -= 12 : 0 > --u && (u = 11, m--), N())
				} ), c( ".dp_caption", z ).bind( "click", function()
				{
					q = "days" == q ? -1 < c.inArray( "months", C ) ? "months" : -1 < c.inArray( "years", C ) ? "years" : "days" : "months" == q ? -1 < c.inArray( "years", C ) ? "years" : -1 < c.inArray( "days", C ) ? "days" : "months" : -1 < c.inArray( "days", C ) ? "days" : -1 < c.inArray( "months", C ) ? "months" : "years";
					N()
				} ), c( ".dp_next", z ).bind( "click", function()
				{
					c( this ).hasClass( "dp_blocked" ) || ("months" == q ? m++ : "years" == q ? m += 12 : 12 == ++u && (u = 0, m++), N())
				} ), B.delegate( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "click", function()
				{
					aa( m, u, k( c( this ).html() ), "days", c( this ) )
				} ), F.delegate( "td:not(.dp_disabled)", "click", function()
				{
					var b = c( this ).attr( "class" ).match( /dp\_month\_([0-9]+)/ );
					u = k( b[ 1 ] );
					-1 == c.inArray( "days", C ) ? aa( m, u, 1, "months", c( this ) ) : (q = "days", a.settings.always_visible && n.val( "" ), N())
				} ), G.delegate( "td:not(.dp_disabled)", "click", function()
				{
					m = k( c( this ).html() );
					-1 == c.inArray( "months", C ) ? aa( m, 1, 1, "years", c( this ) ) : (q = "months", a.settings.always_visible && n.val( "" ), N());
				} ), c( "td", I ).bind( "click", function( b )
				{
					b.preventDefault();
					n.val( "" );
					a.settings.always_visible || (m = u = K = J = R = null, I.css( "display", "none" ));
					a.hide();
					if( a.settings.onClear && "function" == typeof a.settings.onClear ) a.settings.onClear( n );
				} ), a.settings.always_visible || c( document ).bind( {
					mousedown: a._mousedown,
					keyup: a._keyup
				} ), N());
			};
		a.hide = function()
		{
			a.settings.always_visible || (ha( "hide" ), g.css( "display", "none" ));
		};
		a.show = function()
		{
			q = a.settings.view;
			var b = U( n.val() || (a.settings.start_date ? a.settings.start_date : "") );
			b ? (J = b.getMonth(), u = b.getMonth(), K = b.getFullYear(), m = b.getFullYear(), R = b.getDate(), D( K, J, R ) && (n.val( "" ), u = p, m = t)) : (u = p, m = t);
			N();
			if( a.settings.always_visible ) g.css( "display", "block" );
			else
			{
				var b = g.outerWidth(),
					d = g.outerHeight(),
					l = (void 0 != s ? s.offset().left + s.outerWidth( !0 ) : n.offset().left + n.outerWidth( !0 )) + a.settings.offset[ 0 ],
					f = (void 0 != s ? s.offset().top : n.offset().top) - d + a.settings.offset[ 1 ],
					j = c( window ).width(),
					h = c( window ).height(),
					e = c( window ).scrollTop(),
					A = c( window ).scrollLeft();
				l + b > A + j && (l = A + j - b);
				l < A && (l = A);
				f + d > e + h && (f = e + h - d);
				f < e && (f = e);
				g.css( {
					left: l,
					top: f
				} );
				g.fadeIn( "explorer" == M.name && 9 > M.version ? 0 : 150, "linear" );
				ha();
			}
		};
		a.update = function( b )
		{
			a.original_direction && (a.original_direction = a.direction);
			a.settings = c.extend( a.settings, b );
			ga( !0 );
		};
		var U = function( b )
			{
				b += "";
				if( "" != c.trim( b ) )
				{
					var d;
					d = a.settings.format.replace( /\s/g, "" ).replace( /([-.*+?^${}()|[\]\/\\])/g, "\\$1" );
					for( var l = "dDjlNSwFmMnYy".split( "" ), f = [], j = [], h = 0; h < l.length; h++ ) -1 < (position = d.indexOf( l[ h ] )) && f.push( {
						character: l[ h ],
						position: position
					} );
					f.sort( function( a, b )
					{
						return a.position - b.position;
					} );
					c.each( f, function( a, b )
					{
						switch( b.character )
						{
							case "d":
								j.push( "0[1-9]|[12][0-9]|3[01]" );
								break;
							case "D":
								j.push( "[a-z]{3}" );
								break;
							case "j":
								j.push( "[1-9]|[12][0-9]|3[01]" );
								break;
							case "l":
								j.push( "[a-z]+" );
								break;
							case "N":
								j.push( "[1-7]" );
								break;
							case "S":
								j.push( "st|nd|rd|th" );
								break;
							case "w":
								j.push( "[0-6]" );
								break;
							case "F":
								j.push( "[a-z]+" );
								break;
							case "m":
								j.push( "0[1-9]|1[012]+" );
								break;
							case "M":
								j.push( "[a-z]{3}" );
								break;
							case "n":
								j.push( "[1-9]|1[012]" );
								break;
							case "Y":
								j.push( "[0-9]{4}" );
								break;
							case "y":
								j.push( "[0-9]{2}" );
						}
					} );
					if( j.length && (f.reverse(), c.each( f, function( a, b )
						{
							d = d.replace( b.character, "(" + j[ j.length - a - 1 ] + ")" );
						} ), j = RegExp( "^" + d + "$", "ig" ), segments = j.exec( b.replace( /\s/g, "" ) )) )
					{
						var e, m, r, n = ja.days,
							V = ja.months,
							g, p = !0;
						f.reverse();
						c.each( f, function( b, d )
						{
							if( !p ) return !0;
							switch( d.character )
							{
								case "m":
								case "n":
									m = k( segments[ b + 1 ] );
									break;
								case "d":
								case "j":
									e = k( segments[ b + 1 ] );
									break;
								case "D":
								case "l":
								case "F":
								case "M":
									g = "D" == d.character || "l" == d.character ? a.settings.days : a.settings.months;
									p = !1;
									c.each( g, function( a, c )
									{
										if( p ) return !0;
										if( segments[ b + 1 ].toLowerCase() == c.substring( 0, "D" == d.character || "M" == d.character ? 3 : c.length ).toLowerCase() )
										{
											switch( d.character )
											{
												case "D":
													segments[ b + 1 ] = n[ a ].substring( 0, 3 );
													break;
												case "l":
													segments[ b + 1 ] = n[ a ];
													break;
												case "F":
													segments[ b + 1 ] = V[ a ];
													m = a + 1;
													break;
												case "M":
													segments[ b + 1 ] = V[ a ].substring( 0, 3 ), m = a + 1;
											}
											p = !0;
										}
									} );
									break;
								case "Y":
									r = k( segments[ b + 1 ] );
									break;
								case "y":
									r = "19" + k( segments[ b + 1 ] );
							}
						} );
						if( p && (b = new Date( r, (m || 1) - 1, e || 1 ), b.getFullYear() == r && b.getDate() == (e || 1) && b.getMonth() == (m || 1) - 1) ) return b;
					}
					return !1;
				}
			},
			ia = function()
			{
				var b = (new Date( m, u + 1, 0 )).getDate(),
					d = (new Date( m, u, 1 )).getDay(),
					l = (new Date( m, u, 0 )).getDate(),
					d = d - a.settings.first_day_of_week,
					d = 0 > d ? 7 + d : d;
				ba( m + "年, " + a.settings.months[ u ] + "月" );
				var f = "<tr>";
				a.settings.show_week_number && (f += "<th>" + a.settings.show_week_number + "</th>");
				for( var j = 0; 7 > j; j++ ) f += "<th>" + (c.isArray( a.settings.days_abbr ) && void 0 != a.settings.days_abbr[ (a.settings.first_day_of_week + j) % 7 ] ? a.settings.days_abbr[ (a.settings.first_day_of_week + j) % 7 ] : a.settings.days[ (a.settings.first_day_of_week + j) % 7 ].substr( 0, 2 )) + "</th>";
				f += "</tr><tr>";
				for( j = 0; 42 > j; j++ )
				{
					0 < j && 0 == j % 7 && (f += "</tr><tr>");
					if( 0 == j % 7 && a.settings.show_week_number )
					{
						var h = new Date( m, u, j - d + 1 ),
							e = h.getFullYear(),
							n = h.getMonth() + 1,
							h = h.getDate(),
							r = void 0,
							k = void 0,
							g = void 0,
							p = g = void 0,
							q = void 0,
							g = k = r = void 0;
						3 > n ? (r = e - 1, k = (r / 4 | 0) - (r / 100 | 0) + (r / 400 | 0), g = ((r - 1) / 4 | 0) - ((r - 1) / 100 | 0) + ((r - 1) / 400 | 0), g = k - g, p = 0, q = h - 1 + 31 * (n - 1)) : (r = e, k = (r / 4 | 0) - (r / 100 | 0) + (r / 400 | 0), g = ((r - 1) / 4 | 0) - ((r - 1) / 100 | 0) + ((r - 1) / 400 | 0), g = k - g, p = g + 1, q = h + ((153 * (n - 3) + 2) / 5 | 0) + 58 + g);
						r = (r + k) % 7;
						h = (q + r - p) % 7;
						k = q + 3 - h;
						g = 0 > k ? 53 - ((r - g) / 5 | 0) : k > 364 + g ? 1 : (k / 7 | 0) + 1;
						f += '<td class="dp_week_number">' + g + "</td>";
					}
					e = j - d + 1;
					j < d ? f += '<td class="dp_not_in_month">' + x( l - d + j + 1, a.settings.zero_pad ? 2 : 0 ) + "</td>" : e > b ? f += '<td class="dp_not_in_month">' + x( e - b, a.settings.zero_pad ? 2 : 0 ) + "</td>" : (n = (a.settings.first_day_of_week + j) % 7, h = "", D( m, u, e ) ? (h = -1 < c.inArray( n, a.settings.weekend_days ) ? "dp_weekend_disabled" : h + " dp_disabled", u == X && (m == Q && Z == e) && (h += " dp_disabled_current")) : (-1 < c.inArray( n, a.settings.weekend_days ) && (h = "dp_weekend"), u == J && (m == K && R == e) && (h += " dp_selected"), u == X && (m == Q && Z == e) && (h += " dp_current")), f += "<td" + ("" != h ? ' class="' + c.trim( h ) + '"' : "") + ">" + (a.settings.zero_pad ? x( e, 2 ) : e) + "</td>");
				}
				B.html( c( f + "</tr>" ) );
				a.settings.always_visible && (ca = c( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked, .dp_week_number)", B ));
				B.css( "display", "" )
			},
			ha = function( a )
			{
				if( "explorer" == M.name && 6 == M.version )
				{
					if( !S )
					{
						var d = k( g.css( "zIndex" ) ) - 1;
						S = jQuery( "<iframe>", {
							src: 'javascript:document.write("")',
							scrolling: "no",
							frameborder: 0,
							allowtransparency: "true",
							css: {
								zIndex: d,
								position: "absolute",
								top: -1E3,
								left: -1E3,
								width: g.outerWidth(),
								height: g.outerHeight(),
								filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
								display: "none"
							}
						} );
						c( "body" ).append( S )
					}
					switch( a )
					{
						case "hide":
							S.css( "display", "none" );
							break;
						default:
							a = g.offset(), S.css( {
								top: a.top,
								left: a.left,
								display: "block"
							} )
					}
				}
			},
			D = function( b, d, l )
			{
				if( c.isArray( a.settings.direction ) || 0 !== k( a.settings.direction ) )
				{
					var f = k( H( b, "undefined" != typeof d ? x( d, 2 ) : "", "undefined" != typeof l ? x( l, 2 ) : "" ) ),
						j = (f + "").length;
					if( 8 == j && ("undefined" != typeof v && f < k( H( t, x( p, 2 ), x( y, 2 ) ) ) || "undefined" != typeof w && f > k( H( L, x( O, 2 ), x( T, 2 ) ) )) || 6 == j && ("undefined" != typeof v && f < k( H( t, x( p, 2 ) ) ) || "undefined" != typeof w && f > k( H( L, x( O, 2 ) ) )) || 4 == j && ("undefined" != typeof v && f < t || "undefined" != typeof w && f > L) ) return !0
				}
				if( Y )
				{
					"undefined" != typeof d && (d += 1);
					var h = !1;
					c.each( Y, function()
					{
						if( !h && (-1 < c.inArray( b, this[ 2 ] ) || -1 < c.inArray( "*", this[ 2 ] )) )
							if( "undefined" != typeof d && -1 < c.inArray( d, this[ 1 ] ) || -1 < c.inArray( "*", this[ 1 ] ) )
								if( "undefined" != typeof l && -1 < c.inArray( l, this[ 0 ] ) || -1 < c.inArray( "*", this[ 0 ] ) )
								{
									if( "*" == this[ 3 ] ) return h = !0;
									var a = (new Date( b, d - 1, l )).getDay();
									if( -1 < c.inArray( a, this[ 3 ] ) ) return h = !0
								}
					} );
					if( h ) return !0
				}
				return !1
			},
			P = function( a )
			{
				return (a + "").match( /^\-?[0-9]+$/ ) ? !0 : !1
			},
			ba = function( b )
			{
				c( ".dp_caption", z ).html( b );
				if( c.isArray( a.settings.direction ) || 0 !== k( a.settings.direction ) )
				{
					b = m;
					var d = u,
						l, f;
					"days" == q ? (f = 0 > d - 1 ? H( b - 1, "11" ) : H( b, x( d - 1, 2 ) ), l = 11 < d + 1 ? H( b + 1, "00" ) : H( b, x( d + 1, 2 ) )) : "months" == q ? (f = b - 1, l = b + 1) : "years" == q && (f = b - 7, l = b + 7);
					D( f ) ? (c( ".dp_previous", z ).addClass( "dp_blocked" ), c( ".dp_previous", z ).removeClass( "dp_hover" )) : c( ".dp_previous", z ).removeClass( "dp_blocked" );
					D( l ) ? (c( ".dp_next", z ).addClass( "dp_blocked" ), c( ".dp_next", z ).removeClass( "dp_hover" )) : c( ".dp_next", z ).removeClass( "dp_blocked" )
				}
			},
			N = function()
			{
				if( "" == B.text() || "days" == q )
				{
					if( "" == B.text() )
					{
						a.settings.always_visible || g.css( "left", -1E3 );
						g.css( {
							display: "block"
						} );
						ia();
						var b = B.outerWidth(),
							d = B.outerHeight();
						z.css( "width", b );
						F.css( {
							width: b,
							height: d
						} );
						G.css( {
							width: b,
							height: d
						} );
						I.css( "width", b );
						g.css( {
							display: "none"
						} )
					}
					else ia();
					F.css( "display", "none" );
					G.css( "display", "none" )
				}
				else
					if( "months" == q )
					{
						ba( m );
						b = "<tr>";
						for( d = 0; 12 > d; d++ )
						{
							0 < d && 0 == d % 3 && (b += "</tr><tr>");
							var l = "dp_month_" + d;
							D( m, d ) ? l += " dp_disabled" : !1 !== J && J == d ? l += " dp_selected" : X == d && Q == m && (l += " dp_current");
							b += '<td class="' + c.trim( l ) + '">' + (c.isArray( a.settings.months_abbr ) && void 0 != a.settings.months_abbr[ d ] ? a.settings.months_abbr[ d ] : a.settings.months[ d ].substr( 0, 3 )) + " 月</td>"
						}
						F.html( c( b + "</tr>" ) );
						a.settings.always_visible && (da = c( "td:not(.dp_disabled)", F ));
						F.css( "display", "" );
						B.css( "display", "none" );
						G.css( "display", "none" )
					}
					else
						if( "years" == q )
						{
							ba( m - 7 + " - " + (m + 4) );
							b = "<tr>";
							for( d = 0; 12 > d; d++ ) 0 < d && 0 == d % 3 && (b += "</tr><tr>"), l = "", D( m - 7 + d ) ? l += " dp_disabled" : K && K == m - 7 + d ? l += " dp_selected" : Q == m - 7 + d && (l += " dp_current"), b += "<td" + ("" != c.trim( l ) ? ' class="' + c.trim( l ) + '"' : "") + ">" + (m - 7 + d) + "</td>";
							G.html( c( b + "</tr>" ) );
							a.settings.always_visible && (ea = c( "td:not(.dp_disabled)", G ));
							G.css( "display", "" );
							B.css( "display", "none" );
							F.css( "display", "none" )
						}
				a.settings.onChange && ("function" == typeof a.settings.onChange && void 0 != q) && (b = "days" == q ? B.find( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked)" ) : "months" == q ? F.find( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked)" ) : G.find( "td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_blocked)" ), b.each( function()
				{
					if( "days" == q ) c( this ).data( "date", m + "-" + x( u + 1, 2 ) + "-" + x( k( c( this ).text() ), 2 ) );
					else
						if( "months" == q )
						{
							var a = c( this ).attr( "class" ).match( /dp\_month\_([0-9]+)/ );
							c( this ).data( "date", m + "-" + x( k( a[ 1 ] ) + 1, 2 ) )
						}
						else c( this ).data( "date", k( c( this ).text() ) )
				} ), a.settings.onChange( q, b, n ));
				(a.settings.always_show_clear || a.settings.always_visible || "" != n.val()) && "block" != I.css( "display" ) ? I.css( "display", "" ) : I.css( "display", "none" )
			},
			aa = function( b, d, l, f, j )
			{
				var h = new Date( b, d, l, 12, 0, 0 );
				f = "days" == f ? ca : "months" == f ? da : ea;
				var e;
				e = "";
				for( var g = h.getDate(), k = h.getDay(), p = a.settings.days[ k ], q = h.getMonth() + 1, t = a.settings.months[ q - 1 ], s = h.getFullYear() + "", v = 0; v < a.settings.format.length; v++ )
				{
					var w = a.settings.format.charAt( v );
					switch( w )
					{
						case "y":
							s = s.substr( 2 );
						case "Y":
							e += s;
							break;
						case "m":
							q = x( q, 2 );
						case "n":
							e += q;
							break;
						case "M":
							t = c.isArray( a.settings.months_abbr ) && void 0 != a.settings.months_abbr[ q - 1 ] ? a.settings.months_abbr[ q - 1 ] : a.settings.months[ q - 1 ].substr( 0, 3 );
						case "F":
							e += t;
							break;
						case "d":
							g = x( g, 2 );
						case "j":
							e += g;
							break;
						case "D":
							p = c.isArray( a.settings.days_abbr ) && void 0 != a.settings.days_abbr[ k ] ? a.settings.days_abbr[ k ] : a.settings.days[ k ].substr( 0, 3 );
						case "l":
							e += p;
							break;
						case "N":
							k++;
						case "w":
							e += k;
							break;
						case "S":
							e = 1 == g % 10 && "11" != g ? e + "st" : 2 == g % 10 && "12" != g ? e + "nd" : 3 == g % 10 && "13" != g ? e + "rd" : e + "th";
							break;
						default:
							e += w
					}
				}
				n.val( e );
				a.settings.always_visible && (J = h.getMonth(), u = h.getMonth(), K = h.getFullYear(), m = h.getFullYear(), R = h.getDate(), f.removeClass( "dp_selected" ), j.addClass( "dp_selected" ));
				a.hide();
				fa( h );
				if( a.settings.onSelect && "function" == typeof a.settings.onSelect ) a.settings.onSelect( e, b + "-" + x( d + 1, 2 ) + "-" + x( l, 2 ), h, n )
			},
			H = function()
			{
				for( var a = "", d = 0; d < arguments.length; d++ ) a += arguments[ d ] + "";
				return a
			},
			x = function( a, d )
			{
				for( a += ""; a.length < d; ) a = "0" + a;
				return a
			},
			k = function( a )
			{
				return parseInt( a, 10 )
			},
			fa = function( b )
			{
				a.settings.pair && c.each( a.settings.pair, function()
				{
					var a = c( this );
					!a.data || !a.data( "Zebra_DatePicker" ) ? a.data( "zdp_reference_date", b ) : (a = a.data( "Zebra_DatePicker" ), a.update( {
						reference_date: b,
						direction: 0 == a.settings.direction ? 1 : a.settings.direction
					} ), a.settings.always_visible && a.show())
				} )
			};
		a._keyup = function( b )
		{
			("block" == g.css( "display" ) || 27 == b.which) && a.hide();
			return !0
		};
		a._mousedown = function( b )
		{
			if( "block" == g.css( "display" ) )
			{
				//if( a.settings.show_icon ) return !0;
				0 == c( b.target ).parents().filter( ".Zebra_DatePicker" ).length && a.hide()
			}
			return !0
		};
		var M = {
			init: function()
			{
				this.name = this.searchString( this.dataBrowser ) || "";
				this.version = this.searchVersion( navigator.userAgent ) || this.searchVersion( navigator.appVersion ) || ""
			},
			searchString: function( a )
			{
				for( var d = 0; d < a.length; d++ )
				{
					var c = a[ d ].string,
						f = a[ d ].prop;
					this.versionSearchString = a[ d ].versionSearch || a[ d ].identity;
					if( c )
					{
						if( -1 != c.indexOf( a[ d ].subString ) ) return a[ d ].identity
					}
					else
						if( f ) return a[ d ].identity
				}
			},
			searchVersion: function( a )
			{
				var c = a.indexOf( this.versionSearchString );
				if( -1 != c ) return parseFloat( a.substring( c + this.versionSearchString.length + 1 ) )
			},
			dataBrowser: [ {
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "firefox"
			}, {
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "explorer",
				versionSearch: "MSIE"
			} ]
		};
		M.init();
		ga()
	};
	c.fn.Zebra_DatePicker = function( W )
	{
		return this.each( function()
		{
			if( void 0 != c( this ).data( "Zebra_DatePicker" ) )
			{
				var E = c( this ).data( "Zebra_DatePicker" );
				void 0 != E.icon && E.icon.remove();
				E.datepicker.remove();
				c( document ).unbind( "keyup", E._keyup );
				c( document ).unbind( "mousedown", E._mousedown )
			}
			E = new c.Zebra_DatePicker( this, W );
			c( this ).data( "Zebra_DatePicker", E );
		} )
	}
})( jQuery );

/**
 * 测试对象是否是空字符、null、undefined 或者 {}
 * @param obj
 * @returns boolean
 */
function is_empty( obj )
{
	return obj == "" || obj == null || obj == void(0);
}

$( document ).ready( function( e )
{
	$( "input[data-dpformat]" ).each( function( id )
	{
		var format = $( this ).attr( "data-dpformat" );
		var func = $( this ).attr( "data-dpfunc" );

		func = !is_empty( func ) ? eval( func ) : null;
		ipt_dater_init( $( this ), format, func );
	} );
} );

function update_dater()
{
	$( "input[data-dpformat]" ).each( function( id )
	{
		var format = $( this ).attr( "data-dpformat" );
		var func = $( this ).attr( "data-dpfunc" );

		func = !is_empty( func ) ? eval( func ) : null;
		ipt_dater_init( $( this ), format, func );
	} );
}

function ipt_dater_init( target, format, func )
{
	format = is_empty( format ) ? 'Y-m-d' : format;
	target.Zebra_DatePicker( { format: format, show_icon: true, onSelect: func } );
}
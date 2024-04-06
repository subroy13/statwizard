settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

fill(circle((0, 0), 3), yellow);
fill(circle((8, -1), 1), lightblue);
fill(circle((6, -0.6), 0.25), lightyellow);

draw(ellipse((0, 0), 10, 2), dashed);
draw(rotate(-5) * ellipse((8, -0.5), 3, 0.5), dashed);

draw(rotate(-5) * ((11, -0.5) -- (-10, -0.5) ));
draw( (-10, 0) -- (10, 0));

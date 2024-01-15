settings.outformat = "png";
defaultpen(fontsize(16pt));
unitsize(1cm);

fill(box((-2, -2), (6, 6)), white);
fill(box((0, 4), (1, 3)), red);
fill(box((3, 3), (4, 4)), blue);
fill(box((1, 3), (3, 4)), gray);
fill(box((1, 1), (2, 2)), gray);
fill(box((3, 0), (4, 2)), gray);

for (int i = 0; i < 5; ++i) {
    draw((0, i) -- (4, i));
    draw((i, 0) -- (i, 4));
}

label("Start", (-0.5, 4.5));
label("End", (4.5, 4.5));

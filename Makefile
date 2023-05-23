all:
	pdflatex amtools
	bibtex   amtools
	pdflatex amtools
	pdflatex amtools

clean:
	rm -f *.aux *.bbl *.blg *.log

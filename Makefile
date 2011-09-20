PRECISION = 1e-6
INV_PRECISION = $(shell echo 'scale=15;p=1/${PRECISION};scale=0;p/1' | sed 's/1e/10^/' | bc)

SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist
DOC_DIR = ${DIST_DIR}/doc

COMPILER = java -jar ${BUILD_DIR}/compiler.jar  --compilation_level SIMPLE_OPTIMIZATIONS --js

JSDOC = java -jar ${BUILD_DIR}/jsrun.jar  ${BUILD_DIR}/app/run.js -t=${BUILD_DIR}/templates/jsdoc

BASE_FILES = ${SRC_DIR}/vec.js\
	${SRC_DIR}/v3.js\
	${SRC_DIR}/q.js\
	${SRC_DIR}/m34.js\
	${SRC_DIR}/m44.js

MODULES = ${SRC_DIR}/intro.js\
	${BASE_FILES}\
	${SRC_DIR}/outro.js


VJS = ${DIST_DIR}/vec.js
VJS_MIN = ${DIST_DIR}/vec.min.js
VJS_DOC = ${DOC_DIR}/index.html

VJS_VER = $(shell cat version.txt)

VJS_VER = $(shell cat version.txt)

VER = sed "s/@VERSION/${VJS_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: helpHint core doc

core: vjs min
	@@echo "vecJS build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

vjs: ${VJS}

${VJS}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${VJS}
	@@echo "Precision:" ${PRECISION}

	@@cat ${MODULES} | \
		sed 's/@DATE/'"${DATE}"'/g' | \
		sed 's/@PRECISION/${PRECISION}/g' | \
		sed 's/@INV_PRECISION/${INV_PRECISION}/g' | \
		sed '/@license/,/\*\// d' | \
		${VER} > ${VJS};

min: vjs ${VJS_MIN}

${VJS_MIN}: ${VJS}
	@@echo "Minifying vecJS" ${VJS_MIN}; \
	${COMPILER} ${VJS} > ${VJS_MIN}; \

doc: vjs ${VJS_DOC}

${VJS_DOC}:
	@@echo "Building documentation" ${VJS_DOC}
	@@${JSDOC} -d=${DOC_DIR} -D="version:${VJS_VER}" ${VJS}

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

helpHint:
	@@echo "Try make help for a list of available targets"\

help:
	@@echo "Available targets:"
	@@echo " - all: vecjJS, minified vecJS, documentation"
	@@echo " - vjs: only vecJS"
	@@echo " - min: vecJS and minified version"
	@@echo " - doc: vecJS and documentation"
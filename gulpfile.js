var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var gulpMdDocs = require('gulp-md-docs');
var docTemplate = require('./doc_src/index.js');
var ghPages = require('gulp-gh-pages');

gulp.task('compile_doc_css', function () {
    return gulp.src('./doc_src/styl/bundles/doc.styl')
        .pipe(stylus({
            compress: true,
            use: [autoprefixer('last 5 versions')]
        }))
        .pipe(gulp.dest('./doc_src/__root/css'));
});


gulp.task('copy_template_root_dir', function() {
    return gulp.src(docTemplate.root_dir + '/**/*')
        .pipe(gulp.dest('./doc_dist'));
});

gulp.task('compile_uikit_css', function () {
    return gulp.src('./src/styl/bemuikit.styl')
        .pipe(stylus({
            compress: true,
            use: [autoprefixer('last 5 versions')]
        }))
        .pipe(gulp.dest('./doc_src/__root/css'));
});

gulp.task('compile_doc_html', function() {
    return gulp.src('./doc_md/**/*.md')
        .pipe(gulpMdDocs({
            template: docTemplate
        }))
        .pipe(gulp.dest('./doc_dist'));
});

gulp.task('watch', function() {
    gulp.watch('./src/styl/**/*.styl', ['compile_uikit_css', 'copy_template_root_dir']);
    gulp.watch('./doc_src/styl/**/*.styl', ['compile_doc_css', 'copy_template_root_dir']);
    gulp.watch('./doc_md/**/*.md', ['compile_doc_html']);
});

gulp.task('deploy', function() {
  return gulp.src('./doc_dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', function() {
  return gulp.start('compile_doc_css', 'compile_uikit_css', 'compile_doc_html', 'copy_template_root_dir');
});

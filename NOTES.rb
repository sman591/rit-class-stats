# Notes

1. Chrome web scraper aggregates all data, per college
2. Posts aggregate data to API, one post per college
3. Ingest post body, save to (database and S3 cache)
   --> Queue job for consumption, or have a worker loop that listens for new data every minute?
4. Consumption job: parse data into real database objects
5. Consumption job: once complete, delete from table (copy still stored on S3)

To get total count of seats in a college:

x = CourseRealTime.last.capacity_data
x.keys.map { |key| x[key]['enrollment_cap'] }.reduce(:+)

Apply random capacity updates:

x = CourseRealTime.last
sample = x.capacity_data.keys.sample(x.capacity_data.keys.count / 4)
sample.map { |key| x.capacity_data[key]['enrollment_total'] += Random.rand(-3..3) }; x.save

package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.CourseService;
import com.c5r.schoolapp_api.Page.Page;
import com.c5r.schoolapp_api.Page.PageService;
import com.c5r.schoolapp_api.Task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.util.Set;

@RestController
@RequestMapping("/page")
@CrossOrigin(origins = "http://localhost:3000")
public class PageController {
    @Autowired
    private PageService pageService;

    @GetMapping("/getPagesByCourse/{id}")
    public ResponseEntity<Set<Page>> getPagesByCourse(@PathVariable("id") long id) {
        Set<Page> pages = pageService.findPagesByCourse(id);

//        ZoneId timeZoneId = ZoneId.of(timeZone);
//        tasks.forEach(task -> {
//            if(task.getDeadline() != null){
//                task.setDeadline(task.getDeadline().atZone(ZoneId.of("UTC")).withZoneSameInstant(timeZoneId).toLocalDateTime());
//            }
//        });

        return ResponseEntity.ok(pages);
    }

    @PostMapping("/add")
    public ResponseEntity<Page> addPage(@RequestBody Page page) {
        return ResponseEntity.ok(pageService.save(page));
    }
}

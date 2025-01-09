package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Course.CourseService;
import com.c5r.schoolapp_api.Page.Page;
import com.c5r.schoolapp_api.Page.PageRepository;
import com.c5r.schoolapp_api.Page.PageService;
import com.c5r.schoolapp_api.Task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/page")
public class PageController {
    @Autowired
    private PageService pageService;

    @GetMapping("/getPagesByCourse/{id}")
    public ResponseEntity<Set<Page>> getPagesByCourse(@PathVariable("id") long id) {
        Set<Page> pages = pageService.findPagesByCourse(id);

        return ResponseEntity.ok(pages);
    }

    @PostMapping("/add")
    public ResponseEntity<Page> addPage(@RequestBody Page page) {
        return ResponseEntity.ok(pageService.save(page));
    }

    @GetMapping("/getPage/{id}")
    public ResponseEntity<Page> getPage(@PathVariable("id") Long id) {
        Optional<Page> page = pageService.findById(id);

        return page.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/savePageContent/{id}")
    public ResponseEntity<Page> savePageContent(@PathVariable("id") Long id, @RequestBody Page request) {
        Optional<Page> page = pageService.findById(id);

        if(page.isPresent()) {
            return ResponseEntity.ok(pageService.savePageContent(id, request));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/loadPageContent/{id}")
    public ResponseEntity<String> loadPageContent(@PathVariable("id") Long id) {
        Optional<Page> page = pageService.findById(id);

        if(page.isPresent()) {
            return ResponseEntity.ok(page.get().getContent());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deletePage(@PathVariable("id") long id) {
        Optional<Page> page = pageService.findById(id);

        if(page.isPresent()) {
            pageService.delete(page.get());
        }
        else{
            ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getPagesByStudent/{id}")
    public ResponseEntity<Set<Page>> getPagesByStudent(@PathVariable("id") long id) {
        Set<Page> pages = pageService.findPagesByStudent(id);

        return ResponseEntity.ok(pages);
    }

    @RequestMapping(
            value = "/getPagesBySearch",
            method = RequestMethod.POST
    )
    public ResponseEntity<Set<Page>> getPagesBySearch(@RequestBody Page search) {
        Set<Page> pages = pageService.findPagesBySearch(Long.valueOf(search.getStudentId()), search.getTitle());

        return ResponseEntity.ok(pages);
    }
}

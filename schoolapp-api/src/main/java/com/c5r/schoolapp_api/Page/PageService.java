package com.c5r.schoolapp_api.Page;

import com.c5r.schoolapp_api.Course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class PageService {
    @Autowired
    private PageRepository pageRepository;

    public Page save(Page page){ return pageRepository.save(page);}

    public Optional<Page> findById(Long id){return pageRepository.findById(id);}

    public Set<Page> findPagesByCourse(Long id){ return pageRepository.findByCourseId(id); }
}

package com.c5r.schoolapp_api.Page;

import com.c5r.schoolapp_api.Course.Course;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class PageService {
    @Autowired
    private PageRepository pageRepository;

    @Transactional
    public Page save(Page page){ return pageRepository.save(page);}

    @Transactional
    public Optional<Page> findById(Long id){return pageRepository.findById(id);}

    @Transactional
    public Set<Page> findPagesByCourse(Long id){ return pageRepository.findByCourseId(id); }

    @Transactional
    public Page savePageContent(Long id, Page request) {
        Page page = pageRepository.findById(id).orElse(null);

        page.setContent(request.getContent());

        return pageRepository.save(page);
    }
}


